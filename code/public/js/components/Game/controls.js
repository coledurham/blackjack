'use strict'

import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as gameActions from '../../actions/game'

import { generateShoe } from '../../engine/engine'

const Controls = () => {

  const dispatch = useDispatch()
  const game = useSelector((store) => store.game)
  const player = useSelector((store) => store.player)

  const newHandler = useCallback((e) => {
    e.preventDefault()

    dispatch(gameActions.newGame(generateShoe()))

  }, [])

  const hitHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.dealCard(1, 'player'))
  } ,[player])

  return <ul className="controls">
    <li>
    <button onClick={newHandler} disabled={game.game > 0 ? 'disabled' : null}>New Game</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault} disabled={(game.game > 0 && player === 'player') ? null : 'disabled'}>Bet</button>
    </li>
    <li>
      <button onClick={hitHandler} disabled={(game.game > 0 && player === 'player') ? null : 'disabled'}>Hit</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault} disabled={(game.game > 0 && player === 'player') ? null : 'disabled'}>Stay</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault} disabled={(game.game > 0 && player === 'player') ? null : 'disabled'}>Fold</button>
    </li>
  </ul>
}

export default Controls
