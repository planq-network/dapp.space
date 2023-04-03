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
      '0xDe5CD57E48296ed5b8534b2415a3790562afc054',
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
