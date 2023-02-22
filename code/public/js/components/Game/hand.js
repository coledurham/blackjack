'use strict'

import React from 'react'
import { Card } from './card'

const Hand = ({cards=[]}) => {

  return <div className="hand">
    <h2>Hand:</h2>
    { cards.map((card) => <Card card={card}/>) }
  </div>
}

export default Hand
