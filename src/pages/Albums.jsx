import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Albums = () => {
    const [albums, setAlbums] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [itemsPerPage] = useState(20)

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
            setAlbums(response.data)
            setTotalPages(Math.ceil(response.data.length / itemsPerPage))
        }
        fetchAlbums()
    }, [itemsPerPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentAlbums = useMemo(() => {
        return albums.slice(indexOfFirstItem, indexOfLastItem)
    }, [albums, indexOfFirstItem, indexOfLastItem])

    return (
        <div className="px-32">
            <ul className="list-disc pl-5">
                {currentAlbums.map(album => (
                    <li key={album.id}>
                        <Link className="text-black font-medium underline hover:text-blue-500" to={`/albums/${album.id}`}>{album.title}</Link>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 mx-1 rounded-md ${currentPage === page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Albums