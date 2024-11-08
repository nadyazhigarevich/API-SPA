import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    return (
        <nav className="text-gray-600 py-4 px-8 flex justify-end">
            <div className="flex space-x-6">
                <Link to="/" className={`${location.pathname === '/' ? 'text-black font-bold' : 'hover:text-black' }`}>Users</Link>
                <Link to="/albums" className={`${location.pathname === '/albums' ? 'text-black font-bold' : 'hover:text-black' }`}>Albums</Link>
            </div>
        </nav>
    )
}

export default Navbar