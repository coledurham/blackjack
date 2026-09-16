'use strict'

import React from 'react'
import Card from './card'

import type { HandProps } from '@/types/game'

const Hand = ({cards=[]}: HandProps) => {

return <ul className="hand">
    { cards.map((card) => <Card card={card} />) }
  </ul>
}

export default Hand
