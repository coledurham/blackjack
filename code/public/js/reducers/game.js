'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = 0

const game = (state=defaultState, action) => {

    switch(action.type){
        case types.REQUEST_NEW_GAME:
            return state + 1
        case types.REQUEST_NEW_GAME_RECEIVED:
            return state
        case types.REQUEST_CLEAR_GAME:
            return 0
        case types.REQUEST_NEW_GAME_ERROR:
            return action.data
        default:
            return state
    }
}

export default game