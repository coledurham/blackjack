'use strict'

import { ActionTypes as types} from '../constants'

export const updatePlayerHand = (card) => {
    return {
        type: types.UPDATE_HAND,
        data: { card, player: 1}
    }
}