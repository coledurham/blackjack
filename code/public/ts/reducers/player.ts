'use strict'

import { ActionTypes as types, Players} from '@/constants'
import type { PlayerAction } from '@/types/game'

const defaultState: string = Players.PLAYER

const player = (state=defaultState, action: PlayerAction) => {

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