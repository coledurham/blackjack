'use strict'

import { combineReducers } from 'redux'

import game from '../reducers/game'
import playerHand from '../reducers/playerHand'
import dealerHand from '../reducers/dealerHand'
import shoe from '../reducers/shoe'

export default combineReducers({
    game,
    playerHand,
    dealerHand,
    shoe
})