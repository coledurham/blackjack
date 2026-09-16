'use strict'

import { createStore, applyMiddleware, AnyAction, Store } from 'redux'
import thunk, { ThunkDispatch }  from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { gameMiddleware } from '@/middleware/gameMiddleware'

import { rootReducer } from '@/reducers/index'

import type { RootState } from '@/reducers/index'

const logger = createLogger({
    collapsed: true
})

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as any, logger as any, gameMiddleware as any)
) as unknown as Store<RootState, AnyAction> &  { dispatch: AppDispatch }
