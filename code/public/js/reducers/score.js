'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = 0

const score = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_SCORE:
            return state + 1
        case types.UPDATE_SCORE_ERROR:
            return action.data
        default:
            return state
    }
}

export default score