import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './modules/App'
import configureStore, { history } from './common/redux/store'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
