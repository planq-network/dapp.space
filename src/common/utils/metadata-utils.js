import bs58 from 'bs58'
import { Buffer } from 'buffer'

export const base64ToBlob = base64Text => {
  const byteString = atob(base64Text.split(',')[1])

  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uintArray = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i)
  }

  return new Blob([arrayBuffer])
}

export const getBytes32FromIpfsHash = ipfsListing => {
  let decodedHash = bs58.decode(ipfsListing).slice(2)
  decodedHash = Buffer.from(decodedHash).toString('hex')
  return `0x${decodedHash}`
}

export const getIpfsHashFromBytes32 = bytes32Hex => {
  const hashHex = `1220${bytes32Hex.slice(2)}`
  const hashBytes = Buffer.from(hashHex, 'hex')
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}
