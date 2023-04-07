# Dapp.Space

Dapp.Space new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Castrum, Status, MetaMask, Trust, Brave or whichever one you prefer.

You can learn more about bonded curves and how Dapp.Space works [here](https://our.status.im/discover-a-brave-new-curve/).

Dapp.Space is a fork from [Discover](https://github.com/dap-ps/discover/).

## Changelog

### 3rd April 2023
- [4f390e25] Removed embark and replaced it with hardhat
- [daaa92e4] Upgraded all packages but the router one
- [f56395af] Replace BN.js with ethers.BigNumber for compatibility
- [9a26dcd3] Updated web3 syntax's with etherjs ones
- [3d3926b3] Changed the Solidity MiniMeToken contract to support native withdraw/deposit
- [44e6557b] Fixed the popup issue on Firefox
- [4db920a2] Loading fixed in case Metamask is not installed
- [507e6539] Add autofocus for upvoting
- [8f32c714] remove Kyber

## Available Scripts

This project is based on Hardhat v2.12.5, with a few things customised for React.
```
yarn run build:dev
```
or
```
yarn run build:prod
```
Builds the app into the `full-build` directory and creates the `app.zip` ready for use with ElasticBeanstalk.

You can use the Nix shell defined in [`shell.nix`](shell.nix) for build environment:
```
nix-shell --pure
```

## Deployed Contracts

Ropsten (the first is `STT`, the Status Test Token):

```
MiniMeToken: { address: '0xc55cf4b03948d7ebc8b9e8bad92643703811d162' },
Discover: { address: '0x008db8b84547982e8F6677D38e9b9ea64F3ccB8B' },
```

Mainnet:

```
MiniMeToken: { address: '0xf62fd7E2FBe9E610205e4b1B1393d041Bc05f77A' },
Discover: { address: '0xAE4Bb282F92349D00A3109E485FafC745Dd945C4' },
```

## Running It Locally

The goal of our local build process is to abstract away the complexity with smart contracts so that you can focus on adding useful new functionality through React-based bounties that are easy to get started on.

#### 3 Prerequisites

1. [Node v10](https://github.com/nvm-sh/nvm) or higher.
2. [Yarn](https://yarnpkg.com/).
3. [mongodb](https://www.mongodb.com/).

On Linux, setting up `mongodb` is as easy as `sudo apt install -y mongodb`, which will also start it automatically. You can stop/restart your local DB any time with `sudo systemctl stop mongodb`, or get its status with `sudo systemctl status mongodb`. I recommend using the simple [robo3t](https://robomongo.org/download) to view and edit your DB easily (you'll need to set DApps to `APPROVED` to see `Edit` and `Withdraw` options and to see them appear in Categories etc.)

#### 4 Quick Steps

1. `export DB_CONNECTION=mongodb://localhost:27017/mydb`. Make sure you have `DB_CONNECTION` set as an ENV variable so the app knows where to find your local DB.
2. `yarn run build:localhost`. This will:
    1. Compile all your contracts using Embark, connecting to Ropsten and IPFS through an Infura gateway.
    2. Deploy a new instance of Discover onto the Ropsten test network for you to work from. It will only be deployed once, after that the address of your contract is stored in, and fetched from, `shared.development.chains.json`.
    3. Build the frontend, create a directory called `full-build`, move each directory from the `back-end` into it, and include the `frontend` as a directory of its own. It will make sure `node_modules` are installed, then you can serve everything in `full-build` by running:
3. `yarn server-start`. Navigate to `http://localhost:4000` to get developing cool new things for the future of curated information.

**Note:**

1. Change this line in [back-end/config/index.js](https://github.com/dap-ps/discover/blob/master/back-end/config/index.js#L24) to your local Ropsten version of the contract, stored in `shared.development.chains.json`.
2. You'll need to visit [simpledapp.eth using Status](https://status.im/get/) -> Assets Tab -> Request `STT`. This is the Status Test Token on Ropsten that needs to be used with your instance of Discover in order to submit/upvote/downvote in your local app. Using a proper test network even for local development allows us to better understand what the user experience is actually like in production more easily.

#### Work to be done

1. Create a `downvote pool` for each DApp so that anyone can downvote by any amount, not just 1%. When the pool hits 1%, the downvote is sent to the contract. This will be important if people ever stake large amounts, 1% of which may be too expensive for individual users. It will potentially amplify "the community's" ability to respond to bad actors.
2Integrate [embeddable whisper chats](https://github.com/status-im/status-chat-widget) into the site, so that it is easy to plug into the community chat directly "behind" each DApp (it's just the name of the DApp as a whisper topic, i.e. #cryptokitties).
3Research a way to fetch information about popular DApps on Ethereum through non-economic metrics. Perhaps this means just plugging into an API from OpenSea/StateOfTheDApps for now and leveraging their work. Perhaps it means figuring out how to [gossip information about use of DApps via whisper](https://discuss.status.im/t/friend-to-friend-content-discovery-community-feeds/1212)?


#### Running unit tests

Use `./node_modules/.bin/embark test`

To test a specific smart contract you can use `./node_modules/.bin/embark test test/Discover_spec.js`.

#### Running slither

`slither . --exclude naming-convention --filter-paths token`

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that you are working on.
