import React from 'react'

const NotFound = () => (
    <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
        <p>
            Go to page{' '}
            <a className="text-blue-500 underline hover:text-blue-700" href="/">Users</a>
        </p>
    </div>
)

export default NotFound