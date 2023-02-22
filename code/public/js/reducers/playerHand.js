'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = {
    hand: []
}

const playerHand = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_HAND:
            return {
                ...state,
                playerHand: [...playerHand, action.data.card]
            }
        case types.RECEIVED_HAND:
            return {
                ...state,
            }
        case types.RECEIVED_HAND_ERROR:
            return {
                ...state,
                playerHand: action.data
            }
        default:
            return state
    }
}

export default playerHand