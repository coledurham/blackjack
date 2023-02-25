import { ActionTypes as types} from '../constants'

import * as gameActions from '../actions/game'

const dealCardsAction = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch
    
    if(state.shoe.length >= action.data.numCards){
        dispatch({type: types.UPDATE_HAND, data: { player: action.data.player, cards: state.shoe.slice(0, action.data.numCards)}})
        dispatch({type: types.REQUEST_SHOE_DECREMENT, data: { numCards: action.data.numCards }})
        dispatch({type: types.UPDATE_HAND_FINISHED, data: {}})
        next(action)
    }
    else {
        console.error(`::: DISPATCHING REQUEST SHOE DECREMENT ERROR ::: ???`)
        dispatch({type: types.REQUEST_SHOE_DECREMENT_ERROR, data: {}})
    }
}

const checkWinner = (store, next, action) => {
    const state = store.getState()
    const dispatch = store.dispatch

    const dispatchWinner = (player) => {
        dispatch({type: types.UPDATE_WINNER, data: { winner: player }})
        dispatch({type: types.REQUEST_NEW_GAME, data: { winner: player }})
        dispatch(gameActions.newRound())
    }

    const calcValue = (hand) => hand.map(c => c.value).sort((p,n) => p-n).reduce((p,n,i,arr) => {
        if(p+n > 21 && i === arr.length-1 && arr[i] === 11){
            n = 1
        }
    
        return p+n
    }, 0)
    
    const dealerHandVal = calcValue(state.dealerHand)
    const playerHandVal = calcValue(state.playerHand)

    if(dealerHandVal === 21){
        dispatch({type: types.UPDATE_WINNER, data: { winner: 'dealer'}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 0}})
        console.log(`--- dealer is WINNER --- ${dealerHandVal}`)
        dispatchWinner('dealer')
    }

    if(playerHandVal === 21)
    {
        dispatch({type: types.UPDATE_WINNER, data: { winner: 'player'}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})

        console.log(`--- player is WINNER --- ${playerHandVal}`)
        dispatchWinner('player')
    }

    if(playerHandVal > 21 && dealerHandVal <=21){
        dispatch({type: types.UPDATE_WINNER, data: { winner: 'dealer'}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 0 }})

        console.log(`--- dealer is WINNER (player bust) ${playerHandVal} --- ${dealerHandVal}`)
        dispatchWinner('dealer')
    }

    if(playerHandVal <= 21 && dealerHandVal > 21){
        dispatch({type: types.UPDATE_WINNER, data: { winner: 'player'}})
        dispatch({type: types.UPDATE_SCORE, data: { score: 1}})

        console.log(`--- player is WINNER (dealer bust) --- ${playerHandVal}`)
        
        dispatchWinner('dealer')
    }

    dispatch({type: types.UPDATE_PLAYER, data: { player: 'player'}})

    console.log(`end of checkWinner values :: dealer ${dealerHandVal} :: player ${playerHandVal}`)

    next(action)

}

const playerStay = (store, next, action) => {
    const state = store.getState()
    
    /*if(state.shoe.length >= action.data.numCards){
        store.dispatch({type: types.UPDATE_HAND, data: { player: action.data.player, cards: state.shoe.slice(0, action.data.numCards)}})
        store.dispatch({type: types.REQUEST_SHOE_DECREMENT, data: { numCards: action.data.numCards }})
        store.dispatch({type: types.UPDATE_HAND_FINISHED, data: {}})
        next(action)
    }
    else {
        console.error(`::: DISPATCHING REQUEST SHOE DECREMENT ERROR ::: ???`)
        store.dispatch({type: types.REQUEST_SHOE_DECREMENT_ERROR, data: {}})
    }*/
}

export const gameMiddleware = store => next => action => {
    //console.log(`GAME MIDDLEWARE :: ACTION IS :: ${JSON.stringify(action)}`)
    //console.log(`GAME MIDDLEWARE :: ACTION IS :: ${action.type}}`)
    //console.log(`GAME MIDDLEWARE :: ${action.type} STORE IS :: ${JSON.stringify(state)}`)

    if(action.type === types.REQUEST_DEAL_CARDS){
        dealCardsAction(store, next, action)
    }
    else if(action.type === types.CHECK_WINNER || action.type === types.UPDATE_HAND_FINISHED){
        checkWinner(store, next, action)
    }
    else if(action.type === types.REQUEST_QUIT_GAME){
        //TODO: quit game and reset store
    }
    else if(action.type === types.PLAYER_STAY){
        playerStay(store, next, action)
    }
    else{
        next(action)
    }
}