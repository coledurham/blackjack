'use strict'

import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../context/AuthContext.tsx'

const Navigation: React.FC = () => {
    const { user } = useAuth()

    return (<nav id="banner">
      <Link to="/">Blackjack Casino</Link>
      <a href="/logout" >Logout: {user?.name || 'LOGGED IN USER'}</a>
    </nav>)
}

export default Navigation