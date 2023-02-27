'use strict'

import { ActionTypes as types, Players} from '../constants'
import { createShoe } from './shoe'
import { dealCard } from './hand'

const { PLAYER } = Players

const resetGame = ((dispatch, shoe) => {
    dispatch({type: types.REQUEST_QUIT_GAME})
    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})
    dispatch({type: types.REQUEST_EMPTY_SHOE})
    dispatch({type: types.CLEAR_HAND})
    dispatch({type: types.REQUEST_CLEAR_GAME})
    dispatch({type: types.RESET_SCORE})
    dispatch({type: types.RESET_BANK})
    dispatch({type: types.RESET_BET})
    dispatch({type: types.RESET_WINNER})
    dispatch(createShoe(shoe))
})

const createGame = (dispatch, shoe) => {
    dispatch({type: types.REQUEST_NEW_GAME})
    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})
    dispatch(createShoe(shoe))
}

const createRound = (dispatch => {
    dispatch({type: types.REQUEST_NEW_ROUND})
    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})
    dispatch({type: types.CLEAR_HAND})
    dispatch({type: types.RESET_WINNER})
})

const surrenderHand = ((dispatch, bet) => {
    dispatch({type: types.SURRENDER_HAND})
    dispatch({type: types.UPDATE_BANK, data: { bet: -Math.ceil(bet/2)}})
    dispatch({type: types.UPDATE_BET, data: {bet: 0}})
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

export const surrender = (bet) => {
    return (dispatch) => {
        surrenderHand(dispatch, bet)
    }
}

export const stay = () => {
    return (dispatch) => {
        dispatch({type: types.PLAYER_STAY})
    }
}

export const quitGame = (shoe) => {
    return (dispatch) => {
        resetGame(dispatch, shoe)
    }
}

export const initialDeal = () => {
    return (dispatch) => {
        dispatch(dealCard())
        dispatch(dealCard(1, PLAYER))
        dispatch(dealCard())
        dispatch(dealCard(1, PLAYER))
        dispatch({type: types.CHECK_BLACKJACK})
    }
}