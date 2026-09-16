'use strict'

import React, { useContext, createContext, useState, ReactNode } from 'react'

interface GameContextProps {
    children: ReactNode
}
interface GameContextType {
    lobby: string,
    setLobby: React.Dispatch<React.SetStateAction<string>>
}


const GameContext = createContext<GameContextType>({
    lobby: "",
    setLobby: () => {}
})

export const useGame = () =>  useContext(GameContext)

export const GameProvider = ({children}: GameContextProps) => {
    const [lobby, setLobby] = useState("main")

    return <GameContext.Provider value={{lobby, setLobby}}>
            {children}
    </GameContext.Provider>
}