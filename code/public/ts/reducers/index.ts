'use strict'

import { combineReducers } from 'redux'

import game from './game.ts'
import playerHand from './playerHand.ts'
import dealerHand from './dealerHand.ts'
import shoe from './shoe.ts'
import player from './player.ts'
import score from './score.ts'
import winner from './winner.ts'
import bank from './bank.ts'
import bet from './bet.ts'

export default combineReducers({
    game,
    playerHand,
    dealerHand,
    shoe,
    player,
    score,
    winner,
    bank,
    bet
})