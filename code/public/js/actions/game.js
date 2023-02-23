'use strict'

import { ActionTypes as types} from '../constants'
import { createShoe } from './shoe'

const createGame = (dispatch, shoe) => {
    // Increment our game field
    dispatch({type: types.REQUEST_NEW_GAME, data: {}})
    dispatch(createShoe(shoe))
    dispatch(dealCard(2))
    dispatch(dealCard(2, 'player'))
}

export const newGame = (shoe) => {
    return (dispatch) => {
        createGame(dispatch, shoe)
    }
}

export const quitGame = () => {
    return {
        type: types.REQUEST_QUIT_GAME,
        data: {}
    }
}

export const dealCard = (numCards=1, player='dealer') => {
    return {
        type: types.REQUEST_DEAL_CARDS,
        data: { numCards, player}
    }
}