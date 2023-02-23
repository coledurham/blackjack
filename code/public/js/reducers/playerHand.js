'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = {
    hand: []
}

const playerHand = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_HAND:
            if(action.data.player !== 'dealer'){
                return {
                    ...state,
                    hand: [...state.hand, ...action.data.cards]
                }
            }
            return {
                ...state
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