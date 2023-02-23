'use strict'

import React from 'react'
import Card from './card'

const Hand = ({cards=[]}) => {

return <ul className="hand">
    { cards.map((card) => <Card card={card} />) }
  </ul>
}

export default Hand
