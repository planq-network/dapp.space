import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { ethToPlanq, planqToEth } from './keplr-utils'

const _constructorGuard = {}

export class KeplrProvider extends JsonRpcProvider {
  keplrAvailable = false
  chainId = 'planq_7070-2'
  constructor(url, network, chainId) {
    super(url, network)

    this.chainId = chainId
    if (window.keplr) {
      this.keplrAvailable = true
    }
    this.attach()
  }

  // attach the provider to window.ethereum in case MetaMask is not available
  attach() {
    if (!window.ethereum) {
      window.ethereum = this
    }
  }

  // check current network and switch
  async checkNetwork() {
    if (this.keplrAvailable) {
      const chainId = 'planq_7070-2'
      await this.addPlanqChain()
      await window.keplr.enable(chainId)
    }
  }

  async getAccounts() {
    const offlineSigner = window.keplr.getOfflineSigner(this.chainId)
    const accounts = await offlineSigner.getAccounts()
    return planqToEth(accounts[0].address)
  }

  // Compatibility for window.ethereum.request - only used if MetaMask is not available
  async request(req) {
    switch (req.method) {
      case 'eth_requestAccounts':
        return this.getAccounts()
      default:
        return this.send(req.method, req.params)
    }
    return this.send(req.method, req.params)
  }

  async getSigner(index) {
    let account = await this.getAccounts(index)
    return super.getSigner(account)
  }

  async addPlanqChain() {
    await window.keplr.experimentalSuggestChain({
      chainId: 'planq_7070-2',
      chainName: 'Planq',
      rpc: 'https://rpc.planq.network',
      rest: 'https://rest.planq.network',
      bip44: {
        coinType: 60,
      },
      bech32Config: {
        bech32PrefixAccAddr: 'plq',
        bech32PrefixAccPub: 'plq' + 'pub',
        bech32PrefixValAddr: 'plq' + 'valoper',
        bech32PrefixValPub: 'plq' + 'valoperpub',
        bech32PrefixConsAddr: 'plq' + 'valcons',
        bech32PrefixConsPub: 'plq' + 'valconspub',
      },
      currencies: [
        {
          coinDenom: 'PLANQ',
          coinMinimalDenom: 'aplanq',
          coinDecimals: 18,
          coinGeckoId: 'planq',
        },
      ],
      feeCurrencies: [
        {
          coinDenom: 'PLANQ',
          coinMinimalDenom: 'aplanq',
          coinDecimals: 18,
          coinGeckoId: 'planq',
          gasPriceStep: {
            low: 25000000000,
            average: 25000000000,
            high: 40000000000,
          },
        },
      ],
      stakeCurrency: {
        coinDenom: 'PLANQ',
        coinMinimalDenom: 'aplanq',
        coinDecimals: 18,
        coinGeckoId: 'planq',
      },
      features: ['ibc-transfer', 'ibc-go', 'eth-address-gen', 'eth-key-sign'],
    })
  }
}
