'use strict'

import React, { useContext, createContext, useState } from 'react'

const defaultUser = {
    id: 1,
    first_name: 'Bobby',
    last_name: 'Bouche',
    email: 'bobby@bouche.com',
    password: 'password'
    }

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(defaultUser)

    return <AuthContext.Provider value={{user, setUser}}>
            {children}
    </AuthContext.Provider>
}