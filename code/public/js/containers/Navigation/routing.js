'use strict'

import React from 'react'
import { Route, Routes } from "react-router-dom"

import Board from '../Game/board'
import Oops from '../oops'

const Routing = () => {
    return (<Routes>
        <Route path="*" element={ <Oops/> } />
        <Route path="/" element={ <Board/> } />
    </Routes>)
}

export default Routing