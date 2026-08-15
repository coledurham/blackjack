'use strict'

import { ActionTypes as types, Players} from '../constants.ts'

export const dealCard = (numCards=1, player=Players.DEALER) => {
    return {
        type: types.REQUEST_DEAL_CARDS,
        data: { numCards, player }
    }
}