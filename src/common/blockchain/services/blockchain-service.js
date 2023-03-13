/* global web3 */

const ethers = require('ethers')

class BlockchainService {
  constructor(sharedContext, address = '', abi = '', Validator) {
    //this.contract = address.address
    // eslint-disable-next-line no-underscore-dangle
    this._provider = new ethers.providers.Web3Provider(window.ethereum)
    this.contractRaw = new ethers.Contract(
      address,
      abi,
      // eslint-disable-next-line no-underscore-dangle
      this._provider.getSigner(0),
    )
    this.contract = this.contractRaw.address
    this.sharedContext = sharedContext
    this.validator = new Validator(this)
  }

  async getAccount() {
    try {
      if (web3 && ethers.providers.Web3Provider) {
        const account = (
          await window.ethereum.request({ method: 'eth_requestAccounts' })
        )[0]
        return (
          account ||
          (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
        )
      }

      return '0x0000000000000000000000000000000000000000'
    } catch (error) {
      throw new Error(
        'Could not unlock an account. Consider installing Status on your mobile or Metamask extension',
      )
    }
  }

  async __unlockServiceAccount(Contract) {
    const clonedContract = Contract.clone()

    this.sharedContext.account = await this.getAccount()

    if (!this.sharedContext.account) {
      throw new Error('web3 is missing')
    }

    clonedContract.currentProvider = ethers.providers.Web3Provider

    return clonedContract
  }
}

export default BlockchainService
