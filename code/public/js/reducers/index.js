'use strict'

import { combineReducers } from 'redux'

import game from '../reducers/game'
import playerHand from '../reducers/playerHand'
import dealerHand from '../reducers/dealerHand'
import shoe from '../reducers/shoe'
import player from '../reducers/player'
import score from '../reducers/score'
import winner from '../reducers/winner'

export default combineReducers({
    game,
    playerHand,
    dealerHand,
    shoe,
    player,
    score,
    winner
})