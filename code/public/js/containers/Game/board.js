'use strict'

import React from 'react'

import { useSelector } from 'react-redux'

import Hand from '../../components/Game/hand'
import Controls from '../../components/Game/controls'

const CenterBoard = ({winner}) => {
  return (<div className="centerBoard">
      <h1>{ winner ? winner : 'BlackJack Casino'}</h1>
    </div>)
}

const PlayerHUD = ({score}) => {
  return (<div className="hud">
    <h1>Player Hand</h1>
    <p className="score">Score: {score}</p>
  </div>)
}

const Board = () => {

  const playerHand = useSelector((store) => store.playerHand)
  const dealerHand = useSelector((store) => store.dealerHand)
  const score = useSelector((store) => store.score)
  const winner  = useSelector((store) => store.winner)

  return <div id="content" className="board">
    <div className='dealerHand'>
      <h1>Dealer Hand</h1>
      <Hand cards={dealerHand}/>
    </div>
    <CenterBoard winner={winner}/>
    <div className='playerHand'>
      <PlayerHUD score={score} />
      <Hand cards={playerHand}/>
    </div>
    <Controls />
  </div>
}

export default Board
