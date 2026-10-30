import React from 'react';
import Layout from './Components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Components/CartContext';

import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Contect from './Pages/Contect';
import About from './Pages/About';
import Products from './Pages/Products';

const App = () => {
  return (
    <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />}/>
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path='contect' element={<Contect />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </CartProvider>
  );
};

export default App;