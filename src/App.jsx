import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
const App = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/product/:productId' element={<ProductPage/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          {/* 其餘網址一律導回首頁 */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
