'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = 0

const bet = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_BET:
            return action.data.bet
        case types.RESET_BET:
            return 0
        case types.UPDATE_BET_ERROR:
            return action.data
        default:
            return state
    }
}

export default bet