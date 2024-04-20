// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = ({ isOpen, toggleSidebar }) => {
  return (
    <nav className={isOpen ? 'sidebar open' : 'sidebar'}>
      <ul>
        <li>
          <Link to="/" onClick={toggleSidebar}>Home</Link>
        </li>
        <li>
          <Link to="/products" onClick={toggleSidebar}>Products</Link>
        </li>
        <li>
          <Link to="/cart" onClick={toggleSidebar}>Shopping Cart</Link>
        </li>
        <li>
          <Link to="/checkout" onClick={toggleSidebar}>Checkout</Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SellerDashboard;