import { ethers } from 'ethers'
import { broadcastContractFn } from '../helpers'

import BlockchainService from '../blockchain-service'

import SNTValidator from './snt-validator'
import MiniMeTokenArtifact from '../../../../artifacts/contracts/token/MiniMeToken.sol/MiniMeToken.json'

const SNTToken = new ethers.Contract(
  '0xf62fd7E2FBe9E610205e4b1B1393d041Bc05f77A',
  MiniMeTokenArtifact.abi,
  // eslint-disable-next-line no-underscore-dangle
  this._provider.getSigner(0),
)

class SNTService extends BlockchainService {
  constructor(sharedContext) {
    super(sharedContext, SNTToken, SNTValidator)
  }

  async allowance(from, to) {
    return SNTToken.functions
      .allowance(from, to)
      .call({ from: this.sharedContext.account })
  }

  async balanceOf(account) {
    return SNTToken.functions
      .balanceOf(account)
      .call({ from: this.sharedContext.account })
  }

  async controller() {
    return SNTToken.functions
      .controller()
      .call({ from: this.sharedContext.account })
  }

  async transferable() {
    return SNTToken.functions
      .transfersEnabled()
      .call({ from: this.sharedContext.account })
  }

  async approveAndCall(spender, amount, callData) {
    const ConnectedSNTToken = await super.__unlockServiceAccount(SNTToken)
    await this.validator.validateApproveAndCall(spender, amount)
    return broadcastContractFn(
      ConnectedSNTToken.functions.approveAndCall(
        spender,
        amount.toString(),
        callData,
      ),
      this.sharedContext.account,
    )
  }
}

export default SNTService
