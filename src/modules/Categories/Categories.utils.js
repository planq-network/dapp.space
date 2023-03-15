import exchanges from '../../common/assets/images/categories/exchanges.svg'
import defi from '../../common/assets/images/categories/defi.svg'
import marketplaces from '../../common/assets/images/categories/marketplaces.svg'
import other from '../../common/assets/images/categories/other.svg'
import games from '../../common/assets/images/categories/games.svg'
import collectibles from '../../common/assets/images/categories/collectibles.svg'
import socialNetworks from '../../common/assets/images/categories/social-networks.svg'
import utilities from '../../common/assets/images/categories/utilities.svg'
import onramps from '../../common/assets/images/categories/onramp.svg'

const imageMap = {
  EXCHANGES: exchanges,
  DEFI: defi,
  MARKETPLACES: marketplaces,
  OTHER: other,
  GAMES: games,
  COLLECTIBLES: collectibles,
  SOCIAL_NETWORKS: socialNetworks,
  UTILITIES: utilities,
  CRYPTO_ONRAMPS: onramps,
}

export default category => imageMap[category]
