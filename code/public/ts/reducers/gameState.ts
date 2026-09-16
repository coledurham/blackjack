'use strict'

import { ActionTypes as types} from '@/constants'

const defaultState: string = 'uninitialized'

const gameState = (state=defaultState, action: any) => {

    switch(action.type){
        case types.UPDATE_GAME_STATE:
            return action.data.gameState
        case types.UPDATE_GAME_STATE_ERROR:
            return action.data
        default:
            return state
    }
}

export default gameState