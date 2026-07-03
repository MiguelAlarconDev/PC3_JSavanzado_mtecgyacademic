import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import './navbar.css';

export default function Navbar() {
  const { cantidad } = useCarrito() || { cantidad: 0 };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">MTECGY</Link>
        <ul className="nav-links">
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/ofertas">Ofertas</Link></li>
          <li><Link to="/tienda">Tienda</Link></li>
          <li><Link to="/carrito">Carrito ({cantidad})</Link></li>
        </ul>
      </div>
    </nav>
  );
}
