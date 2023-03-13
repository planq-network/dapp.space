/* global web3 */

const TRANSACTION_STATUSES = {
  Failed: 0,
  Successful: 1,
  Pending: 2,
}

const waitOneMoreBlock = async function(prevBlockNumber) {
  return new Promise(resolve => {
    setTimeout(async () => {
      const blockNumber = await window.ethereum.getBlockNumber()
      if (prevBlockNumber === blockNumber) {
        return waitOneMoreBlock(prevBlockNumber)
      }
      resolve()
    }, 30000)
  })
}

export default {
  getTxStatus: async txHash => {
    if (!txHash) {
      return TRANSACTION_STATUSES.Successful
    }

    const txReceipt = await window.ethereum.getTransactionReceipt(txHash)
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
  const networkId = await window.ethereum.networkVersion
  return networkId !== 1
}

export { checkNetwork }
