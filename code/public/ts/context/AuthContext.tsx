'use strict'

import React, { useContext, createContext, useState, ReactNode } from 'react'
import type { SessionUser } from '@src-types/session'

const defaultUser = {
    name: 'bobby bouche',
    email: 'bobby@bouche.com'
}

interface AuthContextProps {
    children: ReactNode
}

interface AuthContextType {
    user: SessionUser,
    setUser: React.Dispatch<React.SetStateAction<SessionUser>>
}

const AuthContext = createContext<AuthContextType>({
    user: defaultUser,
    setUser: () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}: AuthContextProps) => {
    const [user, setUser] = useState<SessionUser>(defaultUser)

    return <AuthContext.Provider value={{user, setUser}}>
            {children}
    </AuthContext.Provider>
}