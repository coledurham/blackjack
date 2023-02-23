'use strict'

import { ActionTypes as types} from '../constants'

const defaultState = {
    shoe: []
}

const shoe = (state=defaultState, action) => {

    switch(action.type){
        case types.REQUEST_NEW_SHOE:
            return {
                ...state,
                shoe: action.data.shoe
            }
        case types.REQUEST_NEW_SHOE_RECEIVED:
            return {
                ...state,
            }
        case types.REQUEST_SHOE_DECREMENT:
            return {
                shoe: [...state.shoe.slice(action.data.numCards)]
            }
        case types.REQUEST_NEW_SHOE_ERROR:
            return {
                ...state,
                shoe: action.data
            }
        default:
            return state
    }
}

export default shoe