'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = 1000

const bank = (state=defaultState, action) => {
    switch(action.type){
        case types.UPDATE_BANK:
            console.log(`::: updating bank with bet :: ${action.data.bet}`)
            return state + action.data.bet
        case types.RESET_BANK:
            return 1000
        case types.UPDATE_BANK_ERROR:
            return action.data
        default:
            return state
    }
}

export default bank