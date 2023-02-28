import { ActionTypes as types, Players, LossStates } from '../constants'

import { calcValue, checkBlackJack, checkBust } from '../engine/engine'

const { DEALER, PLAYER } = Players

const { BUST, DRAW} = LossStates

const dispatchWinner = (player, dispatch) => {
    dispatch({type: types.UPDATE_WINNER, data: { winner: player }})
}

const dealCardsAction = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch
    
    if(state.shoe.length >= action.data.numCards){
        dispatch({type: types.UPDATE_HAND, data: { player: action.data.player, cards: state.shoe.slice(0, action.data.numCards)}})
        dispatch({type: types.REQUEST_SHOE_DECREMENT, data: { numCards: action.data.numCards }})
        dispatch({type: types.UPDATE_HAND_FINISHED})
        next(action)
    }
    else {
        dispatch({type: types.REQUEST_SHOE_DECREMENT_ERROR})
    }
}

const checkBlackJackBust = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch
    
    if(checkBlackJack(state.dealerHand)){
        dispatchWinner(DEALER, dispatch)
        dispatch({type: types.UPDATE_SCORE, data: { score: 0}})
        dispatch({type: types.UPDATE_BANK, data: { bet: -state.bet}})
    }

    if(checkBlackJack(state.playerHand))
    {
        dispatchWinner(PLAYER, dispatch)
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})
        dispatch({type: types.UPDATE_BANK, data: { bet: state.bet}})
    }

    const playerBust = checkBust(state.playerHand)
    const dealerBust = checkBust(state.dealerHand)

    if(playerBust && !dealerBust){
        dispatchWinner(DEALER, dispatch)
        dispatch({type: types.UPDATE_SCORE, data: { score: 0 }})
        dispatch({type: types.UPDATE_BANK, data: { bet: -state.bet}})
    }

    if(dealerBust && !playerBust){
        dispatchWinner(PLAYER, dispatch)
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})
        dispatch({type: types.UPDATE_BANK, data: { bet: state.bet}})
    }

    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})
    next(action)

}

const checkWinner = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch
    const playerHandVal = calcValue(state.playerHand)
    const dealerHandVal = calcValue(state.dealerHand)
    const dealerBust = checkBust(state.dealerHand)
    const playerBust = checkBust(state.playerHand)

    if(!dealerBust && !playerBust && playerHandVal === dealerHandVal){
        dispatchWinner(DRAW, dispatch)
    }

    if(playerBust && dealerBust){
        dispatchWinner(BUST, dispatch)
        dispatch({type: types.UPDATE_BANK, data: { bet: -state.bet}})
    }

    if(!dealerBust && dealerHandVal > playerHandVal){
        dispatchWinner(DEALER, dispatch)
        dispatch({type: types.UPDATE_BANK, data: { bet: -state.bet}})
    }

    if(!playerBust && playerHandVal > dealerHandVal){
        dispatchWinner(PLAYER, dispatch)
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})
        dispatch({type: types.UPDATE_BANK, data: { bet: state.bet}})
    }

    next(action)
}

const dealerPlay = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch

    if(calcValue(state.dealerHand) < 17){
        dispatch({ type: types.REQUEST_DEAL_CARDS, data: { numCards: 1, player: DEALER }})
        dispatch({ type: types.DEALER_PLAY})
    }
    else{
        dispatch({ type: types.CHECK_WINNER })
    }

    next(action)
}

export const gameMiddleware = store => next => action => {
    const state = store.getState()

    if(action.type === types.REQUEST_DEAL_CARDS){
        dealCardsAction(store, next, action)
    }
    else if(action.type === types.CHECK_WINNER){
        checkWinner(store, next, action)
    }
    else if(action.type === types.CHECK_BLACKJACK || (action.type === types.UPDATE_HAND_FINISHED && state.dealerHand.length >= 2 && state.player === PLAYER) && !state.winner){
        checkBlackJackBust(store, next, action)
    }
    else if(action.type === types.PLAYER_STAY || action.type === types.DEALER_PLAY && !state.winner){
        dealerPlay(store, next, action)
    }
    
    next(action)
}