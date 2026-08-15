'use strict'

import { ActionTypes as types} from '../constants.ts'

export const createShoe = (shoe) => {
    return {
        type: types.REQUEST_NEW_SHOE,
        data: { shoe }
    }
}