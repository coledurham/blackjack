'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = []

const playerHand = (state=defaultState, action) => {

    switch(action.type){
        case types.UPDATE_HAND:
            if(action.data.player !== 'dealer'){
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
        default:
            return state
    }
}

export default playerHand