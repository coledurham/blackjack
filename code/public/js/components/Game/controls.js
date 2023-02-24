'use strict'

import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as gameActions from '../../actions/game'
import * as handActions from '../../actions/hand'

import { generateShoe } from '../../engine/engine'

const Controls = () => {

  const dispatch = useDispatch()
  const game = useSelector((store) => store.game)
  const player = useSelector((store) => store.player)
  const winner = useSelector((store) => store.winner)

  const newHandler = useCallback((e) => {
    e.preventDefault()

    dispatch(gameActions.newGame(generateShoe()))

  }, [])

  const hitHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(handActions.dealCard(1, 'player'))
  } ,[player])

  const foldHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.fold())
  })

  const quitHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.quitGame())
  })

  return <ul className="controls">
    <li>
    <button onClick={newHandler} disabled={game > 0 ? 'disabled' : null}>New Game</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault} disabled={(game > 0 && player === 'player') ? null : 'disabled'}>Bet</button>
    </li>
    <li>
      <button onClick={hitHandler} disabled={(game > 0 && player === 'player') ? null : 'disabled'}>Hit</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault} disabled={(game > 0 && player === 'player') ? null : 'disabled'}>Stay</button>
    </li>
    <li>
      <button onClick={foldHandler} disabled={(game > 0 && player === 'player') ? null : 'disabled'}>Fold</button>
    </li>
    <li>
      <button onClick={quitHandler} disabled={(game === 0) ? 'disabled' : null}>Quit</button>
    </li>
  </ul>
}

export default Controls
