import { ethers } from 'ethers'
import { broadcastContractFn } from '../helpers'

import BlockchainService from '../blockchain-service'

import SNTValidator from './snt-validator'
import MiniMeTokenArtifact from '../../../../artifacts/contracts/token/MiniMeToken.sol/MiniMeToken.json'

let SNTToken

class SNTService extends BlockchainService {
  constructor(sharedContext) {
    super(
      sharedContext,
      '0xa2dd72048C2bDc826c827a72c5C94c9a2ff8f7eB',
      MiniMeTokenArtifact.abi,
      SNTValidator,
    )
    SNTToken = this.contractRaw
  }

  async allowance(from, to) {
    return this.contractRaw.allowance(from, to)
  }

  async balanceOf(account) {
    return this.contractRaw.balanceOf(account)
  }

  async controller() {
    return this.contractRaw.controller()
  }

  async transferable() {
    return this.contractRaw.transfersEnabled()
  }

  async withdraw(amount) {
    const ConnectedSNTToken = await super.__unlockServiceAccount(SNTToken)

    let tx = await ConnectedSNTToken.withdraw(amount.toString())
    let receipt = await tx.wait()

    return tx
  }

  async approveAndCall(spender, amount, callData) {
    const ConnectedSNTToken = await super.__unlockServiceAccount(SNTToken)

    await this.validator.validateApproveAndCall(spender, amount)

    let tx = await ConnectedSNTToken.deposit({
      value: amount.toString(),
    })
    let receipt = await tx.wait()

    return await ConnectedSNTToken.approveAndCall(
      spender,
      amount.toString(),
      callData,
    )
  }
}

export default SNTService
