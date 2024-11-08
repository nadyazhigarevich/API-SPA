import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Users from './pages/Users'
import User from './pages/User'
import Albums from './pages/Albums'
import Album from './pages/Album'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<Album />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App