module.exports = {
  default: {
    dappAutoEnable: false,

    gas: 'auto',
    gasPrice: '10000000000', // 10gwei. TODO: Set a proper gas price for deployment. See ethgasstation.info

    strategy: 'explicit',

    deploy: {
      Discover: {
        args: ['$MiniMeToken'],
      },
    },
  },

  development: {
    dappConnection: [
      '$WEB3',
      'https://evm-rpc.planq.network',
    ],
    deploy: {
      Discover: {
        args:["0xbF5d8683b9BE6C43fcA607eb2a6f2626A18837a6"]
      }
    },
    tracking: 'shared.development.chains.json',
  },

  testnet: {
    dappConnection: [
      '$WEB3',
      'https://evm-rpc.planq.network',
    ],
    deploy: {
      Discover: {
        args:["0xbF5d8683b9BE6C43fcA607eb2a6f2626A18837a6"]
      }
    },
    tracking: 'shared.testnet.chains.json',
  },

  livenet: {
    dappConnection: [
      '$WEB3',
      'https://evm-rpc.planq.network',
    ],
    deploy: {
      MiniMeTokenFactory: {
        deploy: false,
      },
      MiniMeToken: {
        address: '0xf62fd7E2FBe9E610205e4b1B1393d041Bc05f77A', // Mainnet SNT address
      },
      Discover: {
        address: '0xAE4Bb282F92349D00A3109E485FafC745Dd945C4',
      }
    },
    tracking: 'shared.mainnet.chains.json',
  },
}
