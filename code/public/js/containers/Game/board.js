'use strict'

import React from 'react'
import Hand from '../../components/Game/hand'
import Controls from '../../components/Game/controls'

const Board = () => {

  return <div id="content" className="board">
    <div className='dealerHand'>
      <Hand />
    </div>
    Game board.
    <Controls />
    <div className='playerHand'>
      <Hand />
    </div>
  </div>
}

export default Board
