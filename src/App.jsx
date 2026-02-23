import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Productos from './pages/Productos'
import FAQ from './pages/FAQ'
import Login from './components/Admin/Login'
import Seed from './components/Admin/Seed'
import ProtectedRoute from './components/Admin/ProtectedRoute'
import Dashboard from './components/Admin/Dashboard'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        {/* Páginas públicas con Navbar + Footer */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/nosotros" element={<PublicLayout><Nosotros /></PublicLayout>} />
        <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />
        <Route path="/productos" element={<PublicLayout><Productos /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />

        {/* Auth y Admin - SIN Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/seed" element={<Seed />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
