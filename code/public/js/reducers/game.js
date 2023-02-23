'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = {
    game: 0
}

const game = (state=defaultState, action) => {

    switch(action.type){
        case types.REQUEST_NEW_GAME:
            return {
                game: state.game + 1
            }
        case types.REQUEST_NEW_GAME_RECEIVED:
            return {
                ...state,
            }
        case types.REQUEST_NEW_GAME_ERROR:
            return {
                ...state,
                game: action.data
            }
        default:
            return state
    }
}

export default game