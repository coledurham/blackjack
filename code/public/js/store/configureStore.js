'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { gameMiddleware } from '../middleware/gameMiddleware'

import rootReducer from '../reducers/index'

const logger = createLogger({
    collapsed: true
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger, gameMiddleware)
)

export default store