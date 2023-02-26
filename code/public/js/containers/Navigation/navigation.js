'use strict'

import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const Navigation = ({redacted}) => {
    const { user } = useAuth()

    return (<nav id="banner">
      <Link to="/">Blackjack Casino</Link>
    </nav>)
}

export default Navigation