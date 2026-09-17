'use strict'

import React from 'react'
import type { Card, Suit, CardProps } from '@/types/game'

const redHands: Array<Suit> = ['diamond', 'heart']

const Card: React.FC<CardProps> = ({card}) => {
  return (<li className="card" style={ redHands.includes(card.suit) ? { color: 'red'} : {}}>
    <h1>{card.face === 'value' ? card.value : card.face }</h1>
    <p>{card.suit}</p>
  </li>)
}

export default Card
