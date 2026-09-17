'use strict'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
//import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"  
import { AuthProvider, useAuth } from '@/context/AuthContext'
import type { AuthSession } from '@src-types/session'

import Navigation from './containers/Navigation/navigation'
import Routing from './containers/Navigation/routing'

import Splash from './containers/Splash/splash'

import { store } from './store/configureStore'

import Footer from './components/footer'

const App: React.FC = () => {
  const { user, setUser } = useAuth()

  useEffect(() => {
    const verifyCreds = async () => {
      const response: Response = await fetch("/verifyCredentials")

      if(!response.ok)
          return

      const authSession: AuthSession = await response.json()

      if(authSession?.user)
        setUser(authSession.user)
    }

    verifyCreds()
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