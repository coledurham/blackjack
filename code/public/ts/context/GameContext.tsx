'use strict'

import React, { useContext, createContext, useState } from 'react'

const GameContext = createContext(null)

export const useGame = () =>  useContext(GameContext)

export const GameProvider = ({children}) => {
    const [lobby, setLobby] = useState(0)

    return <GameContext.Provider value={{lobby, setLobby}}>
            {children}
    </GameContext.Provider>
}