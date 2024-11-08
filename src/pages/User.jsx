import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Breadcrumbs from '../components/Breadcrumbs' 

const User = () => {
    const { id } = useParams()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                setUser(userResponse.data)

                const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
                setAlbums(albumsResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchUser()
    }, [id])

    const albumList = useMemo(() => {
        return albums.map(album => (
            <li key={album.id}>
                <Link className="text-black font-medium underline hover:text-blue-500" to={`/albums/${album.id}`} state={{ from: 'users' }}>
                    {album.title}
                </Link>
            </li>
        ))
    }, [albums])

    if (!user) return <div className='flex items-center justify-center text-3xl font-semibold'>Loading...</div>

    const prevPath = location.state?.from || 'users'
    const breadcrumbs = prevPath === 'albums' ? [
        { label: 'Albums', path: '/albums' },
        { label: albumList.length > 0 ? albums[0].title : 'Album', path: '#' },
        { label: user.name, path: '#' }
    ] : [
        { label: 'Users', path: '/users' },
        { label: user.name, path: '#' }
    ]

    return (
        <div className="px-32 py-8">
            <Breadcrumbs links={breadcrumbs} />
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <h2 className="text-xl font-bold mt-8 mb-4">Albums</h2>
            <ul>
                {albumList}
            </ul>
        </div>
    )
}

export default User