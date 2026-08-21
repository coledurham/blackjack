'use strict'

import React, { useContext, createContext, useState } from 'react'

const defaultUser = {
    name: 'bobby bouche',
    email: 'bobby@bouche.com'
}

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(defaultUser)

    return <AuthContext.Provider value={{user, setUser}}>
            {children}
    </AuthContext.Provider>
}