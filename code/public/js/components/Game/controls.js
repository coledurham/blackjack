'use strict'

import React, { useCallback, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as gameActions from '../../actions/game'
import * as handActions from '../../actions/hand'

import { generateShoe } from '../../engine/engine'

import { Players } from '../../constants'

const { PLAYER } = Players

const Controls = () => {

  const dispatch = useDispatch()
  const game = useSelector((store) => store.game)
  const player = useSelector((store) => store.player)
  const winner = useSelector((store => store.winner))
  
  const [bet, setBet] = useState(null)

  const betHandler = useCallback((e) => {
    const trimmer = (num) => (num[0]>0) ? num : num.slice(1)

    setBet(trimmer(e.target.value.replace(/\D/, '')))
  }, [])

  const newHandler = useCallback((e) => {
    e.preventDefault()

    dispatch(gameActions.newGame(generateShoe()))

  }, [])

  const hitHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(handActions.dealCard(1, PLAYER))
  } ,[player])

  const foldHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.fold())
  })

  const quitHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.quitGame())
  })

  const stayHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.stay())
  })

  const newRoundHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.newRound())
  })

  return <ul className="controls">
    <li>
    <button onClick={newHandler} disabled={game > 0 ? 'disabled' : null}>New Game</button>
    </li>
    <li>
      <input value={bet} disabled={game > 0 && player === PLAYER && !winner ? null : 'disabled' } onChange={betHandler} />
      <button onClick={(e) => e.preventDefault} disabled={(game > 0 && player === PLAYER) ? null : 'disabled'}>Bet</button>
    </li>
    <li>
      <button onClick={hitHandler} disabled={(game > 0 && player === PLAYER && !winner) ? null : 'disabled'}>Hit</button>
    </li>
    <li>
      <button onClick={stayHandler} disabled={(game > 0 && player === PLAYER && !winner) ? null : 'disabled'}>Stay</button>
    </li>
    <li>
      <button onClick={foldHandler} disabled={(game > 0 && player === PLAYER && !winner) ? null : 'disabled'}>Fold</button>
    </li>
    <li>
      <button onClick={newRoundHandler} disabled={(game > 0 && player === PLAYER && winner) ? null : 'disabled'}>New Round</button>
    </li>
    <li>
      <button onClick={quitHandler} disabled={(game === 0) ? 'disabled' : null}>Quit</button>
    </li>
  </ul>
}

export default Controls
