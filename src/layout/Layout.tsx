import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className=' '>
            <div className=""><Navbar /></div>
            <div >{children}</div>
        </div>
    )
}

export default Layout