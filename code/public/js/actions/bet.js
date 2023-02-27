'use strict'

import { ActionTypes as types, Players} from '../constants'

export const setBet = (bet=0) => {
    return {
        type: types.UPDATE_BET,
        data: { bet }
    }
}