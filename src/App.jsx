import { useEffect, useState } from "react"
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Link } from 'react-router-dom'
import ListPage from './pages/List'
import AddPage from './pages/Add'
import EditPage from './pages/Edit'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

 
  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false) //render và đổi giao diện false Đăng nhập – Đăng ký
    window.location.href = "/login"
  }

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-gray-200">Trang chủ</a>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          {/* LOGIN / LOGOUT UI */}
          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-gray-200"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route path="/list" element={
            <ProtectedRoute>
              <ListPage />
            </ProtectedRoute>
          } />

          <Route path="/add" element={
            <ProtectedRoute>
              <AddPage />
            </ProtectedRoute>
          } />

          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          } />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>

      <Toaster />
    </>
  )
}

export default App
