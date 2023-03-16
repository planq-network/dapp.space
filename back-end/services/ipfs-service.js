let ipfsClient
const logger = require('../logger/logger').getLoggerFor('IPFS-Service')
const config = require('../config')

class IPFSService {
  constructor() {
    if (!IPFSService.instance) {
        import('ipfs-http-client').then(mod => {
          ipfsClient = mod
          this.storage = ipfsClient.create({
            host: config.IPFS_HOST,
            port: config.IPFS_PORT,
            protocol: config.IPFS_PROTOCOL,
            headers: {
              authorization: 'Basic ' + Buffer.from(config.IPFS_API).toString("base64"),
            },
          })
          IPFSService.instance = this;
        })


    }

    return IPFSService.instance
  }

  async addContent(content, filename = 'data.json') {
    let data
    if (Buffer.isBuffer(content)) {
      data = content
    } else if (typeof content == 'object') {
      data = Buffer.from(JSON.stringify(content))
    } else {
      data = Buffer.from(content)
    }
    const resp = await this.storage.add(data, { pin: true })
    let hash = resp.path
    logger.info(`Content uploaded to IPFS: ${hash}`)
    return hash
  }

  async generateContentHash(content) {
    return this.addContent(content)
  }
}

module.exports = new IPFSService()
