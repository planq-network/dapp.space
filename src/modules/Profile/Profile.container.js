import { connect } from 'react-redux'
import { withRouter } from '../../common/utils/router'

import Profile from './Profile'
import { showWithdrawAction } from '../Withdraw/Withdraw.reducer'
import { showSubmitAction } from '../Submit/Submit.reducer'

const mapStateToProps = state =>
  Object.assign({ dappState: state.dapps }, state.profile)

const mapDispatchToProps = dispatch => ({
  onClickWithdraw: dapp => dispatch(showWithdrawAction(dapp)),
  onClickUpdateMetadata: dapp => dispatch(showSubmitAction(dapp)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
