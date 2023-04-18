import inchBanner from '../assets/images/featured/inch_banner.png'
import inchLogo from '../assets/images/featured/inch_logo.png'
import RestakeBanner from '../assets/images/featured/restake.png'
import RestakeLogo from '../assets/images/featured/restake_logo.png'
import YieldmosBanner from '../assets/images/featured/yieldmos.png'
import YieldmosLogo from '../assets/images/featured/yieldmos_logo.png'
import StrideBanner from '../assets/images/featured/stride.png'
import StrideLogo from '../assets/images/featured/stride_logo.png'

const featuredDapps = [
  {
    name: 'Stride',
    description:
      'Liquid staking provider. Secure the Cosmos. Unlock liquidity. Earn more yield.',
    url: 'https://app.stride.zone',
    banner: StrideBanner,
    icon: StrideLogo,
  },
  {
    name: 'Restake',
    description:
      'Auto-compound your staking rewards and setup your own custom Authz grants for any chain in the Cosmos ecosystem ⚛️',
    url: 'https://restake.app',
    banner: RestakeBanner,
    icon: RestakeLogo,
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
