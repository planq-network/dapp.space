/* global web3 */
import { ethers } from 'ethers'
import { broadcastContractFn } from '../helpers'

import MetadataClient from '../../../clients/metadata-client'

import BlockchainService from '../blockchain-service'

import DiscoverValidator from './discover-validator'

import DiscoverArtifact from '../../../../artifacts/contracts/Discover.sol/Discover.json'

let DiscoverContract

const EMPTY_METADATA = {
  developer: '',
  id: '',
  metadata: {
    status: 'EMPTY',
  },
  balance: 0,
  rate: 0,
  available: 0,
  votesMinted: 0,
  votesCast: 0,
  effectiveBalance: 0,
}

class DiscoverService extends BlockchainService {
  constructor(sharedContext) {
    super(
      sharedContext,
      '0x043fF89DDE335D69259FdbBDFE4b17D9CD788811',
      DiscoverArtifact.abi,
      DiscoverValidator,
    )
    this.decimalMultiplier = ethers.BigNumber.from('1000000000000000000')
    DiscoverContract = this.contractRaw
  }

  // View methods
  async upVoteEffect(id, amount) {
    const tokenAmount = ethers.BigNumber.from(amount)
    await this.validator.validateUpVoteEffect(id, tokenAmount)

    return this.contractRaw.upvoteEffect(id, tokenAmount.toString())
  }

  async downVoteCost(id) {
    const dapp = await this.getDAppById(id)
    return this.contractRaw.downvoteCost(dapp.id)
  }

  async getDAppsCount() {
    return MetadataClient.getDappsCount()
  }

  async pushDapps(dappsCache, dapps) {
    Object.keys(dappsCache).forEach(metadataHash => {
      const dappMetadata = dappsCache[metadataHash]

      if (dappMetadata.status == 'APPROVED') {
        dapps.push({
          developer: '',
          id: dappMetadata.compressedMetadata,
          metadata: {
            ...dappMetadata.details,
            status: dappMetadata.status,
          },
          balance: 0,
          rate: 0,
          available: 0,
          votesMinted: 0,
          votesCast: 0,
          effectiveBalance: 0,
        })
      }
    })
  }

  async getAllDappsWithoutMetadata() {
    try {
      const contractDappsCount = await this.contractRaw.getDAppsCount()

      const dappsCache = JSON.parse(
        JSON.stringify(await MetadataClient.retrieveMetadataCache()),
      )

      let dapps = []

      await this.pushDapps(dappsCache, dapps)

      return dapps
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getAllDappsWithMetadata() {
    try {
      const contractDappsCount = await this.contractRaw.getDAppsCount()

      const dappsCache = JSON.parse(
        JSON.stringify(await MetadataClient.retrieveMetadataCache()),
      )

      let asyncCalls = []
      for (let i = 0; i < contractDappsCount; i++) {
        asyncCalls.push(this.contractRaw.dapps(i))
      }
      let dapps = []
      /* using Promise.all() to run calls in parallel */
      let dappsCalls = await Promise.all(asyncCalls)

      for (let dapp of dappsCalls) {
        const dappMetadata = dappsCache[dapp.metadata]
        if (dappMetadata) {
          delete dappsCache[dapp.metadata]
          let dappC = { ...dapp }
          dappC.metadata = dappMetadata.details
          dappC.metadata.status = dappMetadata.status

          dapps.push(dappC)
        }
      }

      await this.pushDapps(dappsCache, dapps)

      return dapps
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getDAppByIndexWithMetadata(index) {
    try {
      const dapp = await this.contractRaw.dapps(index)

      const dappMetadata = await MetadataClient.retrieveDAppFromCache(
        dapp.metadata,
      )

      if (dappMetadata === null) return null
      dapp.metadata = dappMetadata.details
      dapp.metadata.status = dappMetadata.status
      return dapp
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getDAppById(id) {
    let dapp = EMPTY_METADATA
    const dappExists = await this.isDAppExists(id)

    if (dappExists) {
      try {
        const dappId = await this.contractRaw.id2index(id)
        dapp = await this.contractRaw.dapps(dappId)
      } catch (error) {
        throw new Error('Searching DApp does not exists')
      }

      if (dapp.id !== id) {
        throw new Error('Error fetching correct data from contract')
      }
    }

    return dapp
  }

  async getDAppDataById(id) {
    const dapp = await this.getDAppById(id)
    if (dapp.metadata.status === 'EMPTY') return EMPTY_METADATA

    try {
      const dappMetadata = await MetadataClient.retrieveMetadata(dapp.metadata)
      if (dappMetadata === null) return EMPTY_METADATA
      dapp.metadata = dappMetadata.details
      dapp.metadata.status = dappMetadata.status

      return dapp
    } catch (error) {
      throw new Error('Error fetching correct data')
    }
  }

  async safeMax() {
    return await this.contractRaw.safeMax()
  }

  async isDAppExists(id) {
    return await this.contractRaw.existingIDs(id)
  }

  async checkIfCreatorOfDApp(id) {
    const dapp = await this.getDAppById(id)
    if (dapp.metadata.status === 'EMPTY') return false
    this.sharedContext.account = await super.getAccount()

    return dapp.developer.toLowerCase() === this.sharedContext.account
  }

  // Transaction methods
  async createDApp(amount, metadata, email) {
    const tokenAmount = this.decimalMultiplier.mul(
      ethers.BigNumber.from(amount),
    )

    const dappMetadata = JSON.parse(JSON.stringify(metadata))
    dappMetadata.uploader = this.sharedContext.account

    const dappId = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(JSON.stringify(dappMetadata)),
    )
    await this.validator.validateDAppCreation(dappId, tokenAmount)

    const uploadedMetadata = await MetadataClient.upload(dappMetadata, email)

    // eslint-disable-next-line no-undef-init
    let createdTx = undefined

    if (tokenAmount.gt(ethers.BigNumber.from(0))) {
      let callData
      let iface = new ethers.utils.Interface(DiscoverArtifact.abi)

      callData = iface.encodeFunctionData('createDApp', [
        dappId,
        tokenAmount.toString(),
        uploadedMetadata,
      ])

      createdTx = await this.sharedContext.SNTService.approveAndCall(
        this.contract,
        tokenAmount,
        callData,
      )
    }

    await MetadataClient.requestApproval(uploadedMetadata)

    return { tx: createdTx, id: dappId }
  }

  async upVote(id, amount) {
    const tokenAmount = this.decimalMultiplier.mul(
      ethers.BigNumber.from(amount),
    )

    await this.validator.validateUpVoting(id, tokenAmount)
    let callData
    let iface = new ethers.utils.Interface(DiscoverArtifact.abi)

    callData = iface.encodeFunctionData('upvote', [id, tokenAmount.toString()])

    return this.sharedContext.SNTService.approveAndCall(
      this.contract,
      tokenAmount,
      callData,
    )
  }

  async downVote(id) {
    const dapp = await this.getDAppById(id)
    const amount = (await this.downVoteCost(dapp.id)).c

    const amountBN = ethers.BigNumber.from(amount)

    const tokenAmount = this.decimalMultiplier.mul(amountBN)
    let callData
    let iface = new ethers.utils.Interface(DiscoverArtifact.abi)

    callData = iface.encodeFunctionData('downvote', [
      dapp.id,
      tokenAmount.toString(),
    ])

    return this.sharedContext.SNTService.approveAndCall(
      this.contract,
      tokenAmount,
      callData,
    )
  }

  async withdraw(id, amount) {
    const tokenAmount = this.decimalMultiplier.mul(
      ethers.BigNumber.from(amount),
    )

    const ConnectedDiscoverContract = await super.__unlockServiceAccount(
      DiscoverContract,
    )
    await this.validator.validateWithdrawing(id, tokenAmount)

    try {
      await ConnectedDiscoverContract.withdraw(id, tokenAmount.toString())
    } catch (error) {
      throw new Error(`Transfer on withdraw failed. Details: ${error.message}`)
    }
  }

  async setMetadata(id, metadata, email) {
    const ConnectedDiscoverContract = await super.__unlockServiceAccount(
      DiscoverContract,
    )
    await this.validator.validateMetadataSet(id)

    const dappMetadata = JSON.parse(JSON.stringify(metadata))
    dappMetadata.uploader = this.sharedContext.account

    const uploadedMetadata = await MetadataClient.upload(dappMetadata, email)

    try {
      const tx = await ConnectedDiscoverContract.setMetadata(
        id,
        uploadedMetadata,
      )
      let receipt = await tx.wait()
      // TODO: This results in endless "Waiting for confirmation... errors, though the tx is successful"
      await MetadataClient.update(id, tx)

      return tx
    } catch (error) {
      throw new Error(`Uploading metadata failed. Details: ${error.message}`)
    }
  }

  async withdrawMax(dappId) {
    const decimals = 1000000
    const draw = await this.contractRaw.withdrawMax(dappId)
    const withdraw = parseInt(draw, 10)
    return Math.floor(withdraw / decimals)
  }
}

export default DiscoverService
