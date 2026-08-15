'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"  
import { AuthProvider, useAuth } from './context/AuthContext.js'

import Navigation from './containers/Navigation/navigation.js'
import Routing from './containers/Navigation/routing.js'

import Splash from './containers/Splash/splash.js'

import store from './store/configureStore.js'

import Footer from './components/footer.js'

const App = (): JSX.Element => {
  const { user, setUser } = useAuth()

  return (!user ?
          (<>
            <Splash />
            <Footer />
          </>) :
          (<>
            <BrowserRouter>
              <Navigation/>
              <Routing />
              <Footer />
            </BrowserRouter>
          </>)
        )
}

ReactDOM.render(<AuthProvider><Provider store={store}><App /></Provider></AuthProvider>, document.getElementById('container'))
