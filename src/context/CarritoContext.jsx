import React, { createContext, useContext, useEffect, useState } from 'react';

const CarritoContext = createContext(null);

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const raw = localStorage.getItem('carrito');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const contarProductos = () => carrito.reduce((t, i) => t + (i.cantidad || 0), 0);

  const guardarCarrito = (nuevo) => {
    setCarrito(nuevo);
  };

  const agregarProducto = (producto) => {
    setCarrito(prev => {
      const existing = prev.find(p => p.id === producto.id);
      if (existing) {
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    alert(`${producto.nombre} agregado al carrito`);
  };

  const aumentarCantidad = (id) => {
    setCarrito(prev => prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p));
  };

  const disminuirCantidad = (id) => {
    setCarrito(prev => {
      const producto = prev.find(p => p.id === id);
      if (!producto) return prev;
      if (producto.cantidad > 1) {
        return prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const calcularTotal = () => carrito.reduce((total, item) => total + (item.precio * (item.cantidad || 0)), 0);

  const value = {
    carrito,
    cantidad: contarProductos(),
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    calcularTotal,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}
