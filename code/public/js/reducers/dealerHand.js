'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = []

const dealerHand = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_HAND:
            if(action.data.player === 'dealer'){
                return [
                    ...state,
                    ...action.data.cards
                ]
            }
            
            return [
                ...state
            ]
        case types.CLEAR_HAND:
            return []
        case types.RECEIVED_HAND:
            return [
                ...state,
            ]
        case types.RECEIVED_HAND_ERROR:
            return [
                action.data
            ]
        default:
            return state
    }
}

export default dealerHand