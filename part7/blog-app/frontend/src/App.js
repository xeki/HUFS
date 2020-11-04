import React from 'react'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import CUserHome from './containers/CUserHome'
import LandingPage from './components/LandingPage'
import CLoginPage from './containers/CLogin'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import CAddPerson from './containers/CAddPerson'
import CMessage from './containers/CMessage'

const App = () => 
  <Provider store={store}>
    <div className='app-container'>
    <CMessage />
    <Router>
      <Switch>
        <Route path='/new' exact component={CAddPerson} />
        <Route path='/user' component={CUserHome} />
        <Route path='/login' component={CLoginPage} />
        <Route path='/' component={LandingPage} />
        <Redirect to='/' />
      </Switch>
    </Router>
    </div>
  </Provider>

export default App
