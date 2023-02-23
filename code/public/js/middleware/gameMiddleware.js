import { ActionTypes as types} from '../constants'

const dealCardsAction = (store, next, action) => {
    const state = store.getState()
    
    if(state.shoe.shoe.length >= action.data.numCards){
        store.dispatch({type: types.UPDATE_HAND, data: { player: action.data.player, cards: state.shoe.shoe.slice(0, action.data.numCards)}})
        store.dispatch({type: types.REQUEST_SHOE_DECREMENT, data: { numCards: action.data.numCards }})
        next(action)
    }
    else {
        console.error(`::: DISPATCHING REQUEST SHOE DECREMENT ERROR ::: ???`)
        store.dispatch({type: types.REQUEST_SHOE_DECREMENT_ERROR, data: {}})
    }
}

export const gameMiddleware = store => next => action => {
    //console.log(`GAME MIDDLEWARE :: ACTION IS :: ${JSON.stringify(action)}`)
    //console.log(`GAME MIDDLEWARE :: ACTION IS :: ${action.type}}`)
    //console.log(`GAME MIDDLEWARE :: ${action.type} STORE IS :: ${JSON.stringify(state)}`)

    const state = store.getState()
    if(action.type === types.REQUEST_DEAL_CARDS){
        dealCardsAction(store, next, action)
    }
    //else if(action.type === types.)
    else{
        next(action)
    }
}