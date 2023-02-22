'use strict'

import React from 'react'  

import BaseLayout from '../Layout/layout'

const Splash = () => {
  return (
    <BaseLayout>
      <div className="splash panel">
        <div className="card">
          <h1>Blackjack</h1>
          <p>Welcome to Blackjack Casino. pleae login or register to start your gaming experience.</p>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </BaseLayout>
   )
}

export default Splash
