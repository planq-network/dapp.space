const Web3 = require('ethers')
const config = require('../config')

module.exports = new Web3(
  new Web3.providers.WebSocketProvider(config.BLOCKCHAIN_CONNECTION_POINT),
)
