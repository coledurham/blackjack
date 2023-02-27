'use strict'

import React, { useCallback, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as gameActions from '../../actions/game'
import * as handActions from '../../actions/hand'
import * as betActions from '../../actions/bet'

import { generateShoe } from '../../engine/engine'

import { Players } from '../../constants'

const { PLAYER } = Players

const Controls = () => {

  const dispatch = useDispatch()
  const player = useSelector((store) => store.player)
  const winner = useSelector((store => store.winner))
  const bank = useSelector((store) => store.bank)
  const playerHand = useSelector((store) => store.playerHand)
  
  
  const [userBet, setUserBet] = useState(null)
  const [allowBet, setAllowBet] = useState(true)

  const getBet = (bet) => {
    const trimmer = (num) => (num[0]>0) ? num : num.slice(1)
    const rawBet = parseInt(trimmer(bet))

    return !isNaN(rawBet) ? rawBet : 0
  }

  const betHandler = useCallback((e) => {
    const betValue = getBet(e.target.value)

    if(betValue <= bank){
      setUserBet(betValue)
    }
  }, [bank])

  const submitBet = useCallback((e) => {
    if(userBet > 0 && userBet <= bank){
      setAllowBet(false)
      dispatch(gameActions.initialDeal())
      dispatch(betActions.setBet(userBet))
    }
  }, [bank, userBet])

  const hitHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(handActions.dealCard(1, PLAYER))
  } ,[player])

  const surrenderHandler = useCallback((e) => {
    e.preventDefault()
    setAllowBet(true)
    dispatch(gameActions.surrender(userBet))
    setUserBet(0)
  }, [userBet])

  const resetHandler = useCallback((e) => {
    e.preventDefault()
    setAllowBet(true)
    setUserBet(0)
    dispatch(gameActions.quitGame(generateShoe()))
  }, [])

  const stayHandler = useCallback((e) => {
    e.preventDefault()
    dispatch(gameActions.stay())
  }, [])

  const newRoundHandler = useCallback((e) => {
    e.preventDefault()
    setAllowBet(true)
    setUserBet(0)
    dispatch(gameActions.newRound())
  }, [])

  const doubleHandler = useCallback((e) => {
    e.preventDefault()
    
    const doubleBet = userBet * 2
    
    setAllowBet(false)
    setUserBet(doubleBet)

    dispatch(betActions.setBet(doubleBet))

    dispatch(handActions.dealCard(1, PLAYER))
    dispatch(gameActions.stay())
  }, [userBet])

  useEffect(() => {
    dispatch(gameActions.newGame(generateShoe()))
  }, [])

  return <ul className="controls">
    <li>
      <input value={userBet} disabled={allowBet && bank > 0 ? null : 'disabled' } onChange={betHandler} autofocus="autofocus" />
      <button onClick={submitBet} disabled={allowBet && bank > 0 ? null : 'disabled'}>Bet</button>
    </li>
    <li>
      <button onClick={doubleHandler} disabled={((player === PLAYER && allowBet) || winner || playerHand.length !== 2) ? 'disabled' : null}>Double</button>
    </li>
    <li>
      <button onClick={hitHandler} disabled={((player === PLAYER && allowBet) || winner) ? 'disabled' : null}>Hit</button>
    </li>
    <li>
      <button onClick={stayHandler} disabled={((player === PLAYER && allowBet) || winner) ? 'disabled' : null}>Stay</button>
    </li>
    <li>
      <button onClick={surrenderHandler} disabled={((player === PLAYER && allowBet) || winner) ? 'disabled' : null}>Surrender</button>
    </li>
    <li>
      <button onClick={newRoundHandler} disabled={(player === PLAYER && winner && bank > 0) ? null : 'disabled'}>New Round</button>
    </li>
    <li>
      <button onClick={resetHandler}>Reset</button>
    </li>
  </ul>
}

export default Controls
