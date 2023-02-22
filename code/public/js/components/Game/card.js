'use strict'

import React from 'react'

const Card = ({card}) => {

  return <div>
    <h1>{card.face}</h1>
    <p>{card.suit}</p>
  </div>
}

export default Card
