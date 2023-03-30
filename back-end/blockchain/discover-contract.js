const web3 = require('ethers')
const config = require('./../config')
const DiscoverABI = require('./discover-abi.json')

module.exports = new web3.Contract(
  config.DISCOVER_CONTRACT,
  DiscoverABI,
  new web3.providers.JsonRpcProvider(config.BLOCKCHAIN_CONNECTION_POINT, 7070),
)
