'use strict'

import { ActionTypes as types, Players} from '../constants'
import { createShoe } from './shoe'
import { dealCard } from './hand'

const { PLAYER} = Players

const createGame = (dispatch, shoe) => {
    dispatch({type: types.REQUEST_NEW_GAME})
    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})
    dispatch(createShoe(shoe))
    dispatch(dealCard())
    dispatch(dealCard(1, PLAYER))
    dispatch(dealCard())
    dispatch(dealCard(1, PLAYER))
    dispatch({type: types.CHECK_BLACKJACK})
}

const createRound = (dispatch => {
    dispatch({type: types.REQUEST_NEW_ROUND})
    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})
    dispatch({type: types.CLEAR_HAND})
    dispatch({type: types.RESET_WINNER})
    dispatch(dealCard())
    dispatch(dealCard(1, PLAYER))
    dispatch(dealCard())
    dispatch(dealCard(1, PLAYER))
    dispatch({type: types.CHECK_BLACKJACK})
})

const foldHand = (dispatch => {
    dispatch({type: types.FOLD_HAND})
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
    return { type: types.REQUEST_QUIT_GAME }
}