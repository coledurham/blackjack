'use strict'

import { ActionTypes as types} from '@/constants'
import type { Shoe, ShoeAction } from '@/types/game'

const defaultState: Shoe = [] as Shoe

const shoe = (state=defaultState, action: ShoeAction) => {

    switch(action.type){
        case types.REQUEST_NEW_SHOE:
            return [
                ...state,
                ...action.data.shoe
            ]
        case types.REQUEST_NEW_SHOE_RECEIVED:
            return [
                ...state,
            ]
        case types.REQUEST_SHOE_DECREMENT:
            return [
                ...state.slice(action.data.numCards)
            ]
        case types.REQUEST_EMPTY_SHOE:
            return  []
        case types.REQUEST_NEW_SHOE_ERROR:
            return [
                ...state,
                ...action.data.shoe
            ]
        default:
            return state
    }
}

export default shoe