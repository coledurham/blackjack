'use strict'

import { ActionTypes as types} from '../constants'
import { createShoe } from './shoe'
import { dealCard } from './hand'

const createGame = (dispatch, shoe) => {
    dispatch({type: types.REQUEST_NEW_GAME, data: {}})
    dispatch({type: types.UPDATE_PLAYER, data: { player: 'player'}})
    dispatch(createShoe(shoe))
    dispatch(dealCard(2))
    dispatch(dealCard(2, 'player'))
    dispatch({type: types.CHECK_WINNER, data: {}})
}

const createRound = (dispatch => {
    dispatch({type: types.REQUEST_NEW_ROUND, data: {}})
    dispatch({type: types.UPDATE_PLAYER, data: { player: 'player'}})
    dispatch({type: types.CLEAR_HAND})
    dispatch(dealCard(2))
    dispatch(dealCard(2, 'player'))
    dispatch({type: types.CHECK_WINNER, data: {}})
})

const foldHand = (dispatch => {
    dispatch({type: types.FOLD_HAND, data: {}})
    createRound(dispatch)
})

export const newGame = (shoe) => {
    return (dispatch) => {
        createGame(dispatch, shoe)
    }
}

export const newRound = () => {
    return (dispatch) => {
        createRound(dispatch)
    }
}

export const fold = () => {
    return (dispatch) => {
        foldHand(dispatch)
    }
}

export const stay = () => {
    return (dispatch) => {
        dispatch({type: types.PLAYER_STAY})
    }
}

export const quitGame = () => {
    return {
        type: types.REQUEST_QUIT_GAME,
        data: {}
    }
}