'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

import BaseLayout from './Layout/layout'

const Oops = () => {
  return <BaseLayout>
      <h1>Oops. Could not load resource</h1>
      <Link to="/">Home</Link>
    </BaseLayout>
}

export default Oops