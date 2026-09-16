'use strict'

import { ActionTypes as types, Players} from '@/constants'
import type { Hand, HandAction } from '@/types/game'

const defaultState: Hand = [] as Hand

const dealerHand = (state=defaultState, action: HandAction) => {

    switch(action.type){
        case types.UPDATE_HAND:
            if(action.data.player === Players.DEALER){
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
            return state
        default:
            return state
    }
}

export default dealerHand