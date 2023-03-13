import reducerUtil from '../../common/utils/reducer'
import BlockchainSDK from '../../common/blockchain'
import { TYPE_SUBMIT } from '../TransactionStatus/TransactionStatus.utilities'
import DappModel, { dappsInitialState, DappState } from '../../common/data/dapp'
import Database from '../../common/data/database'

const ON_UPDATE_DAPPS = 'DAPPS_ON_UPDATE_DAPPS'
const ON_UPDATE_DAPP_DATA = 'DAPPS_ON_UPDATE_DAPP_DATA'

export const onUpdateDappsAction = dappState => ({
  type: ON_UPDATE_DAPPS,
  payload: dappState,
})

export const fetchAllDappsAction = () => {
  return async (dispatch, getState) => {
    const state = getState()
    let dappState = state.dapps

    const dapps = await Database.fetchAllDapps()
    dappState = dappState.addDapps(dapps)
    dispatch(onUpdateDappsAction(dappState))

    try {
      const blockchain = await BlockchainSDK.getInstance()
      const discoverService = blockchain.DiscoverService
      const N = await discoverService.getDAppsCount()
      if (N === 0) {
        dispatch(onUpdateDappsAction(dappState.clone()))
        return
      }

      const { transactionStatus } = state
      let dappSource = ''

      /* we want to show dapps list first and then load all data from blockchain */
      const allDappsWithoutMeta = await discoverService.getAllDappsWithoutMetadata()

      for (let i = 0; i < allDappsWithoutMeta.length; i++) {
        dappSource = allDappsWithoutMeta[i]
        if (dappSource !== null) {
          const dappModel = DappModel.instanceFromBlockchainWithMetadata(
            dappSource,
          )
          dispatch(onUpdateDappsAction(dappState.creditDapp(dappModel)))
        }
      }

      const allDapps = await discoverService.getAllDappsWithMetadata()

      for (let i = 0; i < allDapps.length; i++) {
        dappSource = allDapps[i]
        if (dappSource !== null) {
          const dappModel = DappModel.instanceFromBlockchainWithMetadata(
            dappSource,
          )

          dappState = dappState.creditDapp(dappModel)
          if (
            dappModel.id !== transactionStatus.dappId ||
            transactionStatus.type !== TYPE_SUBMIT
          ) {
            dispatch(onUpdateDappsAction(dappState))
            Database.creditDapp(dappModel)
          }
        }
      }
    } catch (e) {
      console.log('error', e)
      // setTimeout(() => {
      //   dispatch(showAlertAction(e.message))
      // }, 1000)
      // no need to show current blockchain errors, cache is used to there will be any data
      // dispatch(showAlertAction(e.message))
      dispatch(onUpdateDappsAction(dappState.clone()))
    }
  }
}

export const onUpdateDappDataAction = dapp => ({
  type: ON_UPDATE_DAPP_DATA,
  payload: dapp,
})

const onUpdateDappData = (state, dapp) => {
  Database.creditDapp(dapp)
  return state.creditDapp(dapp)
}

const onUpdateDapps = (state, dappState) => {
  return Object.assign(new DappState(), dappState)
}

const map = {
  [ON_UPDATE_DAPP_DATA]: onUpdateDappData,
  [ON_UPDATE_DAPPS]: onUpdateDapps,
}

export default reducerUtil(map, dappsInitialState)
