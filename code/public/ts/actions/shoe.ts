'use strict'

import { ActionTypes as types} from '../constants.ts'
import type { Shoe } from '@/types/game'

export const createShoe = (shoe: Shoe) => {
    return {
        type: types.REQUEST_NEW_SHOE,
        data: { shoe }
    }
}