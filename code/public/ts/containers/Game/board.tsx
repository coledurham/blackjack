'use strict'

import React from 'react'

import { useAppSelector } from '@/store/hooks'

import { CenterBoardProps, PlayerHUDProps } from '@/types/game'

import Hand from '@/components/Game/hand'
import Controls from '@/components/Game/controls'
import { useAuth } from '@/context/AuthContext'

const CenterBoard: React.FC<CenterBoardProps> = ({winner}) => {
  return (<div className="centerBoard">
      <h1>{ winner ? winner : 'BlackJack Casino'}</h1>
    </div>)
}

const PlayerHUD: React.FC<PlayerHUDProps> = ({score, bank, player}) => {
  return (<div className="hud">
    <h1>Player Hand: {player || ''}</h1>
    <p className="score">Score: {score}</p>
    <p className="bank">Bank : {bank}</p>
  </div>)
}

const Board: React.FC = () => {
  const playerHand = useAppSelector((store) => store.playerHand)
  const dealerHand = useAppSelector((store) => store.dealerHand)
  const score = useAppSelector((store) => store.score)
  const winner  = useAppSelector((store) => store.winner)
  const bank = useAppSelector((store) => store.bank)

  const { user } = useAuth()
  
  return <div id="content" className="board">
    <div className='dealerHand'>
      <h1>Dealer Hand</h1>
      <Hand cards={dealerHand ?? []}/>
    </div>
    <CenterBoard winner={winner}/>
    <div className='playerHand'>
      <PlayerHUD score={score} bank={bank} player={user?.name}/>
      <Hand cards={playerHand}/>
    </div>
    <Controls />
  </div>
}

export default Board
