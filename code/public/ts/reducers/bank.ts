'use strict'

import { ActionTypes as types} from '@/constants'
import type { BankAction } from '@/types/game'

const defaultState: number = 1000

const bank = (state:number = defaultState, action: BankAction) => {
    switch(action.type){
        case types.UPDATE_BANK:
            return state + action.data.bet
        case types.RESET_BANK:
            return defaultState
        case types.UPDATE_BANK_ERROR:
            return action.data
        default:
            return state
    }
}

export default bank