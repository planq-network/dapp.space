import HTTPClient from './http-client'

import * as helpers from '../utils/metadata-utils'

let metadataCache = null

class MetadataClient {
  static async upload(metadata, email) {
    try {
      const uploadedDataResponse = await HTTPClient.postRequest('/metadata', {
        metadata,
        email,
      })

      return helpers.getBytes32FromIpfsHash(uploadedDataResponse.data.hash)
    } catch (error) {
      throw new Error('A DApp was not uploaded in the client')
    }
  }

  static async update(dappId, tx) {
    try {
      await HTTPClient.postRequest(`/metadata/update/${dappId}`, { txHash: tx })
    } catch (error) {
      throw new Error('DApp metadata was not updated in the client')
    }
  }

  static async requestApproval(metadataBytes32) {
    try {
      const ipfsHash = helpers.getIpfsHashFromBytes32(metadataBytes32)
      await HTTPClient.postRequest(`/metadata/approve/email/${ipfsHash}`)
    } catch (error) {
      throw new Error('No DApp was found for approval')
    }
  }

  static async retrieveMetadata(metadataBytes32) {
    try {
      const convertedHash = helpers.getIpfsHashFromBytes32(metadataBytes32)
      const retrievedMetadataResponse = await HTTPClient.getRequest(
        `/metadata/${convertedHash}`,
      )

      if (metadataCache !== null)
        metadataCache[metadataBytes32] = retrievedMetadataResponse.data
      return retrievedMetadataResponse.data
    } catch (error) {
      throw new Error('Searching DApp was not found in the client')
    }
  }

  static async retrieveAllDappsMetadata() {
    const retrievedDAppsMetadataResponse = await HTTPClient.getRequest(
      '/metadata/all',
    )

    const formatedDappsMetadata = {}
    const metadataHashes = Object.keys(retrievedDAppsMetadataResponse.data)
    for (let i = 0; i < metadataHashes.length; i++) {
      const convertedDappMetadataHash = helpers.getBytes32FromIpfsHash(
        metadataHashes[i],
      )

      formatedDappsMetadata[convertedDappMetadataHash] =
        retrievedDAppsMetadataResponse.data[metadataHashes[i]]
    }

    return formatedDappsMetadata
  }

  static async getDappsCount() {
    if (metadataCache === null)
      metadataCache = await MetadataClient.retrieveAllDappsMetadata()
    return Object.keys(metadataCache).length
  }

  static async retrieveMetadataCache() {
    if (metadataCache === null)
      metadataCache = await MetadataClient.retrieveAllDappsMetadata()

    return metadataCache
  }

  static async retrieveDAppFromCache(metadataBytes32) {
    if (metadataCache === null)
      metadataCache = await MetadataClient.retrieveAllDappsMetadata()
    const result = metadataCache[metadataBytes32]
    return result !== undefined ? result : null
  }
}

export default MetadataClient
