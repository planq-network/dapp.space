import { ethers } from 'ethers'
import { bech32 } from 'bech32'
import { Buffer } from 'buffer'

export const ethToPlanq = ethAddress => {
  const data = ETH.decoder(ethAddress)
  return PLANQ.encoder(data)
}

export const planqToEth = planqAddress => {
  const data = PLANQ.decoder(planqAddress)
  return ETH.encoder(data)
}

function makeChecksummedHexDecoder(chainId) {
  return data => {
    const stripped = stripHexPrefix(data)
    if (
      !isValidChecksumAddress(data, chainId || null) &&
      stripped !== stripped.toLowerCase() &&
      stripped !== stripped.toUpperCase()
    ) {
      throw Error('Invalid address checksum')
    }
    return Buffer.from(stripHexPrefix(data), 'hex')
  }
}

function makeChecksummedHexEncoder(chainId) {
  return data => toChecksumAddress(data.toString('hex'), chainId || null)
}

const hexChecksumChain = (name, chainId) => ({
  decoder: makeChecksummedHexDecoder(chainId),
  encoder: makeChecksummedHexEncoder(chainId),
  name,
})

export const ETH = hexChecksumChain('ETH')

function makeBech32Encoder(prefix) {
  return data => bech32.encode(prefix, bech32.toWords(data))
}

function makeBech32Decoder(currentPrefix) {
  return data => {
    const { prefix, words } = bech32.decode(data)
    if (prefix !== currentPrefix) {
      throw Error('Unrecognised address format')
    }
    return Buffer.from(bech32.fromWords(words))
  }
}

const bech32Chain = (name, prefix) => ({
  decoder: makeBech32Decoder(prefix),
  encoder: makeBech32Encoder(prefix),
  name,
})

export const PLANQ = bech32Chain('PLANQ', 'plq')

export const stripHexPrefix = str => {
  return str.slice(0, 2) === '0x' ? str.slice(2) : str
}
export const toChecksumAddress = (address, chainId = null) => {
  if (typeof address !== 'string') {
    throw new Error(
      "stripHexPrefix param must be type 'string', is currently type " +
        typeof address +
        '.',
    )
  }
  return ethers.utils.getAddress(address)
}
export function isValidChecksumAddress(address, chainId) {
  return (
    isValidAddress(address) && toChecksumAddress(address, chainId) === address
  )
}
function isValidAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}
