import { ActionTypes as types} from '../constants'

export const gameMiddleware = store => next => action => {
    const state = store.getState()
    //console.log(`GAME MIDDLEWARE :: ACTION IS :: ${JSON.stringify(action)}`)
    console.log(`GAME MIDDLEWARE :: ACTION IS :: ${action.type}}`)
    //console.log(`GAME MIDDLEWARE :: ${action.type} STORE IS :: ${JSON.stringify(state)}`)

    if(action.type === types.REQUEST_DEAL_CARDS){
        //console.log(`REQUEST_DEAL_CARDS IF state.shoe.shoe.length is :: ${state.shoe.shoe.length}`)
        //console.log(`REQUEST_DEAL_CARDS IF state.shoe.shoe.length is :: ${JSON.stringify(action.data)}`)
        if(state.shoe.shoe.length >= action.data.numCards){
            console.log(`::: INSIDE CHECK FOR SHOE GREATER THAN NUMCARDS REQUEST :::`)
            store.dispatch({type: types.UPDATE_HAND, data: { player: action.data.player,cards: state.shoe.shoe.slice(0, action.data.numCards)}})
            store.dispatch({type: types.REQUEST_SHOE_DECREMENT, data: { numCards: action.data.numCards }})
            next(action)
        }
        else {
            console.log(`::: DISPATCHING REQUEST SHOE DECREMENT ERROR ::: ???`)
            store.dispatch({type: types.REQUEST_SHOE_DECREMENT_ERROR, data: {}})
        }
    }
    else{
        next(action)
    }
}