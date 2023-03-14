const web3 = require('ethers')
const config = require('./../config')
const DiscoverABI = require('./discover-abi.json')
const Web3 = require("ethers");

module.exports = new web3.Contract(
  config.DISCOVER_CONTRACT,
  DiscoverABI,
  new Web3.providers.JsonRpcProvider(config.BLOCKCHAIN_CONNECTION_POINT),
  7070,
)
