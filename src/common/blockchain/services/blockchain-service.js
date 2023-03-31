/* global web3 */

const ethers = require('ethers')

class BlockchainService {
  constructor(sharedContext, address = '', abi = '', Validator) {
    // eslint-disable-next-line no-underscore-dangle
    this._provider = new ethers.providers.Web3Provider(window.ethereum)
    this.checkNetwork()
    this.abi = abi
    this.contractRaw = new ethers.Contract(
      address,
      abi,
      // eslint-disable-next-line no-underscore-dangle
      this._provider,
    )
    this.contract = this.contractRaw.address
    this.sharedContext = sharedContext
    this.validator = new Validator(this)
  }

  async getAccount() {
    try {
      if (web3 && this._provider) {
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

  async checkNetwork() {
    const currentNetworkId = await this._provider.getNetwork()

    if (currentNetworkId.chainId != '7070') {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x1B9E',
            rpcUrls: ['https://evm-rpc.planq.network/'],
            chainName: 'Planq Network',
            nativeCurrency: {
              name: 'Planq',
              symbol: 'PLQ',
              decimals: 18,
            },
            blockExplorerUrls: ['https://evm.planq.network/'],
          },
        ],
      })
    }
  }

  async __unlockServiceAccount(Contract) {
    this.sharedContext.account = await this.getAccount()

    const clonedContract = new ethers.Contract(
      this.contract,
      this.abi,
      this._provider.getSigner(0),
    )

    if (!this.sharedContext.account) {
      throw new Error('web3 is missing')
    }

    clonedContract.currentProvider = this._provider.getSigner(0)

    return clonedContract
  }
}

export default BlockchainService
