import { ethers } from 'ethers'

class SNTValidator {
  constructor(service) {
    this.service = service
  }

  async validateSNTTransferFrom(amount) {
    const toBalanceBN = await this.service._provider.getBalance(
      this.service.sharedContext.account,
    )

    if (amount.gt(toBalanceBN)) {
      throw new Error('Not enough PLQ balance')
    }
  }

  async validateApproveAndCall(spender, amount) {
    const isTransferableToken = await this.service.transferable()
    if (!isTransferableToken) {
      throw new Error('Token is not transferable')
    }

    await this.validateSNTTransferFrom(amount)
  }
}

export default SNTValidator
