import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Cart from './Cart/Cart';
import OrderHistory from './OrderHistory/OrderHistory';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Products from './Products/Products';
import Shipping from './Shipping/Shipping';
import './App.css'; // Make sure to include this at the top of App.js


function App() {
  return (
    <div >
      <NavBar />
      <div className='bg'>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
