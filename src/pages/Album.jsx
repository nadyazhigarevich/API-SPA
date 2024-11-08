import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Breadcrumbs from '../components/Breadcrumbs' 

const Album = () => {
    const { id } = useParams()
    const location = useLocation()
    const [album, setAlbum] = useState(null)
    const [photos, setPhotos] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
                setAlbum(albumResponse.data)

                const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
                setPhotos(photosResponse.data)

                const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${albumResponse.data.userId}`)
                setUser(userResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAlbum()
    }, [id])

    const photoList = useMemo(() => {
        return photos.map(photo => (
            <div key={photo.id} className="border rounded-md overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={photo.thumbnailUrl || 'https://via.placeholder.com/150x150'}
                    alt={photo.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x150'
                        e.target.alt = 'Placeholder'
                    }}
                />
            </div>
        ))
    }, [photos])

    if (loading) {
        return <div className='flex items-center justify-center text-3xl font-semibold'>Loading...</div>
    }

    const prevPath = location.state?.from || 'albums'
    
    const breadcrumbs = prevPath === 'albums' ? [
        { label: 'Albums', path: '/albums' },
        { label: album?.title, path: '#' },
    ] : [
        { label: 'Users', path: '/users' },
        { label: user?.name, path: `/users/${user?.id}` },
        { label: album?.title, path: '#' },
    ]

    return (
        <div className="px-32">
            <Breadcrumbs links={breadcrumbs} />
            <h1 className="text-2xl font-bold">{album?.title}</h1>
            <p className='text-gray-600 mb-4'>Created by:
                <Link className="text-blue-500 hover:underline" to={`/users/${album?.userId}`}> {user?.name}</Link>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {photoList}
            </div>
        </div>
    )
}

export default Album