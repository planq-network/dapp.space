import UnUniFiBanner from '../assets/images/featured/ununifi_banner.jpg'
import UnUniFiLogo from '../assets/images/featured/ununifi_logo.png'
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
    name: 'UnUniFi',
    description:
      'UnUniFi is a fast, open, interoperable smart contracts layer 1 blockchain optimized for NFT-Fi infrastructure.',
    url: 'https://lab-testnet.ununifi.io/',
    banner: UnUniFiBanner,
    icon: UnUniFiLogo,
  },
  {
    name: 'Yieldmos',
    description:
      'Non-custodial yield optimization and asset management for the Cosmos-verse | Not Smart Contract Based',
    url: 'https://www.yieldmos.com/strategies',
    banner: YieldmosBanner,
    icon: YieldmosLogo,
  },
]

export default featuredDapps
