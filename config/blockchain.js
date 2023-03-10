if (!process.env.WALLET_MNEMONIC) {
  throw Error('Env variable WALLET_MNEMONIC not defined!')
}

module.exports = {
  default: {
    enabled: true,
    accounts: [
      {
        mnemonic: process.env.WALLET_MNEMONIC,
        hdpath: process.env.HD_PATH, // If undefined, it will default to the default hd path
        balance: '1534 ether',
      },
    ],
  },

  development: {
    networkType: 'testnet',
    endpoint: `https://evm-rpc.planq.network`,
  },

  testnet: {
    networkType: 'testnet',
    endpoint: `https://evm-rpc.planq.network`,
  },

  livenet: {
    networkId: 7070,
    endpoint: `https://evm-rpc.planq.network`,
  },
}
