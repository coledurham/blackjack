'use strict'

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/reducers/index'
import type { AppDispatch } from '@/store/configureStore' 

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector