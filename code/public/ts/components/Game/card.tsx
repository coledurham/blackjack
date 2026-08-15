'use strict'

import React from 'react'

const redHands = ['diamonds', 'hearts']

const Card = ({card}) => {
  return (<li className="card" style={ redHands.includes(card.suit) ? { color: 'red'} : null}>
    <h1>{card.face}</h1>
    <p>{card.suit}</p>
  </li>)
}

export default Card
