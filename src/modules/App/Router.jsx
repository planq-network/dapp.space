import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Filtered from '../Filtered'
import RecentlyAdded from '../RecentlyAdded'
import Profile from '../Profile'
import Dapps from '../Dapps'
import Vote from '../Vote'
import Submit from '../Submit'
import Terms from '../Terms/Terms'
import TransactionStatus from '../TransactionStatus'
import Alert from '../Alert'
import HowToSubmit from '../HowToSubmit'
import Withdraw from '../Withdraw'

class Router extends React.Component {
  componentDidMount() {
    const { fetchAllDapps } = this.props
    fetchAllDapps()
  }

  render() {
    return (
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/categories/:id" element={<Filtered />} />
          <Route path="/all" element={<Dapps />} />
          <Route path="/recently-added" element={<RecentlyAdded />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/:dapp_name" element={<Home />} />
        </Routes>
        <Vote />
        <Submit />
        <HowToSubmit />
        <TransactionStatus />
        <Alert />
        <Routes>
          <Route path="/:dapp_name" component={<Profile />} />
        </Routes>
        <Withdraw />
      </Fragment>
    )
  }
}

Router.propTypes = {
  fetchAllDapps: PropTypes.func.isRequired,
}

export default Router
