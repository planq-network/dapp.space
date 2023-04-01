const ethers = require('ethers')
const config = require('./../config')
const DiscoverABI = require('./discover-abi.json')
const provider = require('./web3')

module.exports = new ethers.Contract(
  config.DISCOVER_CONTRACT,
  DiscoverABI,
  provider,
)
