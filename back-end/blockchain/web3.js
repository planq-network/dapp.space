const { ethers } = require('ethers')
const config = require('../config')

module.exports = new ethers.providers.JsonRpcProvider(
  config.BLOCKCHAIN_CONNECTION_POINT,
  {chainId: 7070, name:"Planq"},
)
