import OsmosisBanner from '../assets/images/featured/osmosis.png'
import OsmosisLogo from '../assets/images/featured/osmosis_logo.png'
import YieldmosBanner from '../assets/images/featured/yieldmos.png'
import YieldmosLogo from '../assets/images/featured/yieldmos_logo.png'
import NrideBanner from '../assets/images/featured/nride.png'
import NrideLogo from '../assets/images/featured/nride_logo.png'

const featuredDapps = [
  {
    name: 'nRide',
    description:
      'nRide is developing a peer-to-peer ride-hailing protocol that connects riders and drivers directly, eliminating intermediaries.',
    url: 'https://www.nride.com/get-started#try-app',
    banner: NrideBanner,
    icon: NrideLogo,
  },
  {
    name: 'Yieldmos',
    description:
      'Non-custodial yield optimization and asset management for the Cosmos-verse | Not Smart Contract Based',
    url: 'https://www.yieldmos.com/strategies',
    banner: YieldmosBanner,
    icon: YieldmosLogo,
  },
  {
    name: 'Osmosis',
    description:
      'Osmosis is the premier cross-chain DeFi hub.',
    url: 'https://app.osmosis.zone/',
    banner: OsmosisBanner,
    icon: OsmosisLogo,
  },
]

export default featuredDapps
