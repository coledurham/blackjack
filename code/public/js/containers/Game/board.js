'use strict'

import React from 'react'

import { useSelector } from 'react-redux'

import Hand from '../../components/Game/hand'
import Controls from '../../components/Game/controls'

const CenterBoard = () => {
  return (<div className="centerBoard">
      <h1>BlackJack Casino</h1>
    </div>)
}

const Board = () => {

  const playerHand = useSelector((store) => store.playerHand.playerHand)
  const dealerHand = useSelector((store) => store.dealerHand.dealerHand)

  return <div id="content" className="board">
    <div className='dealerHand'>
      <h1>Dealer Hand</h1>
      <Hand cards={dealerHand}/>
    </div>
    <CenterBoard />
    <div className='playerHand'>
      <h1>Player Hand</h1>
      <Hand cards={playerHand}/>
    </div>
    <Controls />
  </div>
}

export default Board
