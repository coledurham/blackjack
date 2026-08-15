'use strict'

import { ActionTypes as types, Players} from '../constants.ts'

export const setBet = (bet=0) => {
    return {
        type: types.UPDATE_BET,
        data: { bet }
    }
}