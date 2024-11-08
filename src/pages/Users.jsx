import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUsers(response.data)
        }
        fetchUsers()
    }, [])

    // Use useMemo to optimize the user list rendering
    const userList = useMemo(() => {
        return users.map(user => (
            <li key={user.id}>
                <Link className="text-black font-medium underline hover:text-blue-500" to={`/users/${user.id}`}>
                    {user.name}
                </Link>
            </li>
        ))
    }, [users])

    return (
        <div className="px-32">
            <ul className="list-none">
                {userList}
            </ul>
        </div>
    )
}

export default Users