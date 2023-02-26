import { ActionTypes as types, Players, LossStates } from '../constants'

import { calcValue, checkBlackJack, checkBust } from '../engine/engine'

const { DEALER, PLAYER } = Players

const { BUST, DRAW} = LossStates

const dispatchWinner = (player, dispatch) => {
    dispatch({type: types.UPDATE_WINNER, data: { winner: player }})
    dispatch({type: types.REQUEST_NEW_GAME, data: { winner: player }})
    //dispatch(gameActions.newRound())
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
        console.error(`::: DISPATCHING REQUEST SHOE DECREMENT ERROR :::`)
        dispatch({type: types.REQUEST_SHOE_DECREMENT_ERROR})
    }
}

const checkBlackJackBust = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch
    
    if(checkBlackJack(state.dealerHand)){
        dispatch({type: types.UPDATE_WINNER, data: { winner: DEALER}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 0}})
        console.log(`--- dealer is WINNER --- ${calcValue(state.dealerHand)}`)
        dispatchWinner(DEALER, dispatch)
    }

    if(checkBlackJack(state.playerHand))
    {
        dispatch({type: types.UPDATE_WINNER, data: { winner: PLAYER}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})

        console.log(`--- player is WINNER --- ${calcValue(state.playerHand)}`)
        dispatchWinner(PLAYER, dispatch)
    }

    const playerBust = checkBust(state.playerHand)
    const dealerBust = checkBust(state.dealerHand)

    if(playerBust && !dealerBust){
        dispatch({type: types.UPDATE_WINNER, data: { winner: DEALER}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 0 }})

        console.log(`--- dealer is WINNER (player bust) ${calcValue(state.playerHand)} --- ${calcValue(state.dealerHand)}`)
        dispatchWinner(DEALER, dispatch)
    }

    if(dealerBust && !playerBust){
        dispatch({type: types.UPDATE_WINNER, data: { winner: PLAYER}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})

        console.log(`--- player is WINNER (dealer bust) --- ${calcValue(state.playerHand)}`)
        
        dispatchWinner(DEALER, dispatch)
    }

    dispatch({type: types.UPDATE_PLAYER, data: { player: PLAYER}})

    console.log(`end of checkWinner values :: dealer ${calcValue(state.dealerHand)} :: player ${calcValue(state.playerHand)}`)

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
        // draw
        console.log('--- draw ---')
        dispatchWinner(DRAW, dispatch)
    }

    if(playerBust && dealerBust){
        //bust
        console.log('--- player bust ---')
        dispatchWinner(BUST, dispatch)
    }

    if(!dealerBust && dealerHandVal > playerHandVal){
        //dealer win
        console.log('--- dealer winner ---')
        dispatchWinner(DEALER, dispatch)
    }

    if(!playerBust && playerHandVal > dealerHandVal){
        //player win
        console.log('--- player winner ---')
        dispatchWinner(PLAYER, dispatch)
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
        //checkWinner(store, next, action)
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
    else if(action.type === types.CHECK_BLACKJACK || (action.type === types.UPDATE_HAND_FINISHED && state.dealerHand.length >= 2 && state.player === PLAYER)){
        checkBlackJackBust(store, next, action)
    }
    else if(action.type === types.REQUEST_QUIT_GAME){
        //TODO: quit game and reset store
    }
    else if(action.type === types.PLAYER_STAY || action.type === types.DEALER_PLAY){
        dealerPlay(store, next, action)
    }
    else{
        next(action)
    }
}