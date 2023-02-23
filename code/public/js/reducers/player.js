'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = 'player'

const player = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_PLAYER:
            return action.data.player
        case types.UPDATE_PLAYER_ERROR:
            return action.data
        default:
            return state
    }
}

export default player