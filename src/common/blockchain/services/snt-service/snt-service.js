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
    return SNTToken.allowance(from, to)
  }

  async balanceOf(account) {
    return SNTToken.balanceOf(account)
  }

  async controller() {
    return SNTToken.controller()
  }

  async transferable() {
    return SNTToken.transfersEnabled()
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
