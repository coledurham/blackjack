'use strict'

import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as gameActions from '../../actions/game'
import * as shoeActions from '../../actions/shoe'

import { generateShoe } from '../../engine/engine'

const Controls = () => {

  const dispatch = useDispatch()
  const game = useSelector((store) => store.game)

  const newHandler = useCallback((e) => {
    e.preventDefault()

    dispatch(gameActions.newGame(generateShoe()))

  }, [])

  return <ul className="controls">
    <li>
    <button onClick={newHandler} disabled={game.game > 0 ? 'disabled' : null}>New Game</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Bet</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Hit</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Stay</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Fold</button>
    </li>
  </ul>
}

export default Controls
