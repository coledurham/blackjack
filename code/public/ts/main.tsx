'use strict'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"  
import { AuthProvider, useAuth } from './context/AuthContext.js'
import { AuthSession } from '../../types/session.js'

import Navigation from './containers/Navigation/navigation.js'
import Routing from './containers/Navigation/routing.js'

import Splash from './containers/Splash/splash.js'

import store from './store/configureStore.js'

import Footer from './components/footer.js'

const App: React.FC = () => {
  const { user, setUser } = useAuth()

  useEffect(async () => {
    const response: Response = await fetch("/verifyCredentials")

    if(!response.ok)
        return

    const authSession: AuthSession = await response.json()

    if(authSession?.user)
      setUser(authSession.user)
  }, [])

  return (!user ?
          (<>
            <Splash />
            <Footer />
          </>) :
          (<>
            <BrowserRouter>
              <Navigation />
              <Routing />
              <Footer />
            </BrowserRouter>
          </>)
        )
}

ReactDOM.render(<AuthProvider><Provider store={store}><App /></Provider></AuthProvider>, document.getElementById('container'))
