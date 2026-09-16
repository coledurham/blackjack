'use strict'

import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const DefaultLayout = ({children}: LayoutProps) => {
    return (<div id="content">
        {children}
    </div>)
}


export default DefaultLayout