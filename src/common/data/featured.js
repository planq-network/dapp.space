import inchBanner from '../assets/images/featured/inch_banner.png'
import inchLogo from '../assets/images/featured/inch_logo.png'
import HopersBanner from '../assets/images/featured/hopers.png'
import HopersLogo from '../assets/images/featured/hopers_logo.png'
import KujiraFinBanner from '../assets/images/featured/kujira_fin.png'
import KujiraFinLogo from '../assets/images/featured/kujira_fin_logo.png'
import OsmosisBanner from '../assets/images/featured/osmosis.png'
import OsmosisLogo from '../assets/images/featured/osmosis_logo.png'

const featuredDapps = [
  {
    name: 'Osmosis',
    description: 'Osmosis is the premier cross-chain DeFi hub.',
    url: 'https://frontier.osmosis.zone/',
    banner: OsmosisBanner,
    icon: OsmosisLogo,
  },
  {
    name: 'Hopers',
    description:
      'The first fully-permissionless DEX living in the Cosmos. Friction-less yield.',
    url: 'https://hopers.io',
    banner: HopersBanner,
    icon: HopersLogo,
  },
  {
    name: 'Kujira Fin',
    description:
      "Cosmos's first decentralized, permissionless, 100% on-chain, order book style token exchange.",
    url: 'https://fin.kujira.app',
    banner: KujiraFinBanner,
    icon: KujiraFinLogo,
  },
]

export default featuredDapps
