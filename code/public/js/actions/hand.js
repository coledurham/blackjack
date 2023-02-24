'use strict'

import { ActionTypes as types} from '../constants'

export const dealCard = (numCards=1, player='dealer') => {
    return {
        type: types.REQUEST_DEAL_CARDS,
        data: { numCards, player}
    }
}