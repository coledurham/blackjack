'use strict'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Provider, useSelector } from 'react-redux'
import { BrowserRouter } from "react-router-dom"  
import { AuthProvider, useAuth } from './context/AuthContext'

import axios from 'axios'

import Navigation from './containers/Navigation/navigation'
import Routing from './containers/Navigation/routing'

import Splash from './containers/Splash/splash'

import store from './store/configureStore'

import Footer from './components/footer'

const App = () => {
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
