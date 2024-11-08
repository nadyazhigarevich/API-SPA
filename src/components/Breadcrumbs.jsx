import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ links }) => {
    return (
        <nav className="mb-4">
            <ul className="flex space-x-2">
                {links.map((link, index) => (
                    <li key={index}>
                        {index > 0 && <span>/</span>}
                        <Link className="text-blue-500 hover:underline" to={link.path}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs