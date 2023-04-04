/* global web3 */

const TRANSACTION_STATUSES = {
  Failed: 0,
  Successful: 1,
  Pending: 2,
}

const waitOneMoreBlock = async function(prevBlockNumber) {
  return new Promise(resolve => {
    setTimeout(async () => {
      const blockNumber = await window.ethereum.request({
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
      })
      if (prevBlockNumber === blockNumber) {
        return waitOneMoreBlock(prevBlockNumber)
      }
      resolve()
    }, 6000)
  })
}

export default {
  getTxStatus: async txHash => {
    if (!txHash) {
      return TRANSACTION_STATUSES.Successful
    }

    const txReceipt = await window.ethereum.request({
      method: 'eth_getTransactionReceipt',
      params: [txHash.hash],
    })

    if (txReceipt) {
      await waitOneMoreBlock(txReceipt.blockNumber)

      return txReceipt.status
        ? TRANSACTION_STATUSES.Successful
        : TRANSACTION_STATUSES.Failed
    }

    return TRANSACTION_STATUSES.Pending
  },
}

const checkNetwork = async () => {
  const networkId = await window.ethereum.request({
    method: 'net_version',
  })

  return networkId != 7070
}

export { checkNetwork }
