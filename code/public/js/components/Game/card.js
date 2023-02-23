'use strict'

import React from 'react'

const Card = ({card}) => {
  return (<li className="card">
    <h1>{card.face}</h1>
    <p>{card.suit}</p>
  </li>)
}

export default Card
