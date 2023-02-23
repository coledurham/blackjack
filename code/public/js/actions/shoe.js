'use strict'

import { ActionTypes as types} from '../constants'

export const createShoe = (shoe) => {
    return {
        type: types.REQUEST_NEW_SHOE,
        data: { shoe }
    }
}