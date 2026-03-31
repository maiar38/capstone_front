import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import Navbar from "./components/Navbar"
import ProtectedRoute  from "./components/ProtectedRoute"

import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage  from "./pages/ProfilePage"
import Footer from "./components/Footer"
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/shop" element={<ShopPage />}/>
              <Route path="/product/:id" element={<ProductPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              }/>
              
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App