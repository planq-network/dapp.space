/* global web3 */

import { KeplrProvider } from '../keplr-provider'

const ethers = require('ethers')

class BlockchainService {
  constructor(sharedContext, address = '', abi = '', Validator) {
    // eslint-disable-next-line no-underscore-dangle
    this._provider = new KeplrProvider(
      'https://evm-rpc.planq.network:443',
      {
        chainId: 7070,
        name: 'Planq',
      },
      'planq_7070-2',
      true,
    )

    this._provider.checkNetwork()
    this._provider.getAccounts()
    //this._provider = new ethers.providers.Web3Provider(window.ethereum)
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
      if (this._provider) {
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
    console.log(this.sharedContext.account)
    const signer = await this._provider.getSigner(0)

    const clonedContract = new ethers.Contract(
      this.contractRaw.address,
      this.abi,
      signer,
    )

    if (!this.sharedContext.account) {
      throw new Error('web3 is missing')
    }

    clonedContract.currentProvider = signer

    return clonedContract
  }
}

export default BlockchainService
