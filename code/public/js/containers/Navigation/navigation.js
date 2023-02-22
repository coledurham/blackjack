'use strict'

import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const Navigation = ({redacted}) => {
    const { user } = useAuth()

    return (<nav id="banner">
      <Link to="/">Blackjack Casino</Link>
      { user ? <a style={{ marginLeft: 'auto'}} href="/logout" onClick={(e) => {
        e.preventDefault()
        axios.delete('/logout')
        .then(() => window.location.href='/' )
        .catch((err) => console.error(err))
      }}>Logout</a> : null }
    </nav>)
}

export default Navigation