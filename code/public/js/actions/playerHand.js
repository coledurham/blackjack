'use strict'

import { ActionTypes as types} from '../constants'

export const dealCard = (player) => {
    return {
        type: types.UPDATE_HAND,
        data: { player}
    }
}