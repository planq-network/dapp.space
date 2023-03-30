const Web3 = require('ethers')
const config = require('../config')

module.exports = new Web3.providers.JsonRpcProvider(
  config.BLOCKCHAIN_CONNECTION_POINT,
  7070,
)
