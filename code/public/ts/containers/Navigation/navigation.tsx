'use strict'

import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../context/AuthContext.tsx'

const Navigation = ({redacted}) => {
    const { user } = useAuth()

    return (<nav id="banner">
      <Link to="/">Blackjack Casino</Link>
      <a href="/logout" >Logout: {user?.name || ''}</a>
    </nav>)
}

export default Navigation