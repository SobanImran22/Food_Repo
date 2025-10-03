import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  const [showLogin,setShowLogin]= useState(false)
  return (
<>
{showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
<div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <a
  href="https://wa.me/447529403535" // remove "+"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      zIndex: 1000,
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  />
</a>



    <Footer/>
</>
  )
}

export default App
