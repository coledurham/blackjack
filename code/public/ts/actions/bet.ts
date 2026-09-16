'use strict'

import { ActionTypes as types } from '@/constants'

export const setBet = (bet: number = 0) => {
    return {
        type: types.UPDATE_BET,
        data: { bet }
    }
}