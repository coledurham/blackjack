'use strict'

import { ActionTypes as types, Players} from '../constants.ts'

export const dealCard = (numCards: number = 1, player: string = Players.DEALER) => {
    return {
        type: types.REQUEST_DEAL_CARDS,
        data: { numCards, player }
    }
}