'use strict'

import React, { useCallback, useState, useEffect } from 'react'
import { AppDispatch } from '@/store/configureStore'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

import * as gameActions from '@/actions/game'
import * as handActions from '@/actions/hand'
import * as betActions from '@/actions/bet'

import { generateShoe } from '@/engine/engine'

import { Players } from '@/constants'

const { PLAYER } = Players

const Controls: React.FC = () => {

  // TODO: Create types for each and type variables
  const dispatch: AppDispatch = useAppDispatch()
  const player = useAppSelector((store) => store.player)
  const winner = useAppSelector((store) => store.winner)
  const bank = useAppSelector((store) => store.bank)
  const playerHand = useAppSelector((store) => store.playerHand)
  
  
  const [userBet, setUserBet] = useState<number>(0)
  const [allowBet, setAllowBet] = useState<boolean>(true)

  const getBet = (bet: string) => {
    const trimmer = (num: string) => (parseInt(num[0])>0) ? num : num.slice(1)
    const rawBet: number = parseInt(trimmer(bet))

    return !isNaN(rawBet) ? rawBet : 0
  }

  const betHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    const betValue: number = getBet(e.currentTarget?.value) ?? 0

    if(betValue <= bank){
      setUserBet(betValue)
    }
  }, [bank])

  const submitBet = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if(userBet > 0 && userBet <= bank){
      setAllowBet(false)
      dispatch(gameActions.initialDeal())
      dispatch(betActions.setBet(userBet))
    }
  }, [bank, userBet])

  const hitHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(handActions.dealCard(1, PLAYER))
  } ,[player])

  const surrenderHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAllowBet(true)
    dispatch(gameActions.surrender(userBet))
    setUserBet(0)
  }, [userBet])

  const resetHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAllowBet(true)
    setUserBet(0)
    dispatch(gameActions.quitGame(generateShoe()))
  }, [])

  const stayHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(gameActions.stay())
  }, [])

  const newRoundHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAllowBet(true)
    setUserBet(0)
    dispatch(gameActions.newRound())
  }, [])

  const doubleHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const doubleBet: number = userBet * 2
    
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
      <input value={userBet} disabled={allowBet && (bank > 0) ? false : true } onChange={betHandler} autoFocus={true} />
      <button onClick={submitBet} disabled={allowBet && bank > 0 ? false : true}>Bet</button>
    </li>
    <li>
      <button onClick={doubleHandler} disabled={((player === PLAYER && allowBet) || winner || playerHand.length !== 2) ? true : false}>Double</button>
    </li>
    <li>
      <button onClick={hitHandler} disabled={((player === PLAYER && allowBet) || winner) ? true : false}>Hit</button>
    </li>
    <li>
      <button onClick={stayHandler} disabled={((player === PLAYER && allowBet) || winner) ? true : false}>Stay</button>
    </li>
    <li>
      <button onClick={surrenderHandler} disabled={((player === PLAYER && allowBet) || winner) ? true : false}>Surrender</button>
    </li>
    <li>
      <button onClick={newRoundHandler} disabled={(player === PLAYER && winner && bank > 0) ? false : true}>New Round</button>
    </li>
    <li>
      <button onClick={resetHandler}>Reset</button>
    </li>
  </ul>
}

export default Controls
