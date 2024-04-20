import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Corrected import path
import ProductList from './components/ProductList'; // Corrected import path
import ShoppingCart from './components/ShoppingCart';
import Checkout from './pages/Checkout'; // Corrected import path
import SellerDashboard from './pages/SellerDashboard'; // Corrected import path
import Login from './pages/login'; // Corrected import path (assuming the file name is "Login")
import Register from './pages/register'; // Corrected import path (assuming the file name is "Register")
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [registered, setRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleRegisterClick = () => {
    setRegistered(true);
  };

  const handleLoginClick = () => {
    setRegistered(false);
  };

  return (
    <Router>
      <div className="App">
        {registered ? <Login /> : <Register />}
        {!registered && (
          <p>
            Not registered?{" "}
            <button onClick={handleRegisterClick}>Register</button>
          </p>
        )}
        {registered && (
          <p>
            Already registered?{" "}
            <button onClick={handleLoginClick}>Login</button>
          </p>
        )}
        {registered && (
          <p>
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
          </p>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          {registered && (
            <Route
              path="/dashboard"
              element={
                <div>
                  <SellerDashboard />
                  {isOpen && <Sidebar />}
                </div>
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
