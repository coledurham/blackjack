'use strict'

import { ActionTypes as types} from '@/constants'
import { ScoreAction } from '@/types/game'

const defaultState: number = 0

const score = (state=defaultState, action: ScoreAction) => {

    switch(action.type){
        case types.UPDATE_SCORE:
            return state + action.data.score
        case types.RESET_SCORE:
            return 0
        case types.UPDATE_SCORE_ERROR:
            return action.data
        default:
            return state
    }
}

export default score