'use strict'

import { ActionTypes as types} from '@/constants'
import type { WinnerAction } from '@/types/game'

const defaultState: string = ''

const score = (state=defaultState, action: WinnerAction) => {

    switch(action.type){
        case types.UPDATE_WINNER:
            return action.data.winner
        case types.RESET_WINNER:
            return ''
        case types.UPDATE_WINNER_ERROR:
            return action.data
        default:
            return state
    }
}

export default score