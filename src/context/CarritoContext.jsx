import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CarritoContext = createContext(null);

export function useCarrito() {
  return useContext(CarritoContext);
}

function obtenerCarritoInicial() {
  try {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  } catch (error) {
    console.error('Error al leer el carrito desde localStorage:', error);
    return [];
  }
}

function calcularCantidad(listaCarrito) {
  return listaCarrito.reduce(
    (total, producto) => total + Number(producto.cantidad || 0),
    0
  );
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(obtenerCarritoInicial);

  function guardarYActualizar(nuevoCarrito) {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    window.dispatchEvent(
      new CustomEvent('carritoActualizado', {
        detail: {
          carrito: nuevoCarrito,
          cantidad: calcularCantidad(nuevoCarrito),
        },
      })
    );
  }

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const cantidadProductos = useMemo(() => {
    return calcularCantidad(carrito);
  }, [carrito]);

  const totalCarrito = useMemo(() => {
    return carrito.reduce(
      (total, producto) =>
        total + Number(producto.precio || 0) * Number(producto.cantidad || 0),
      0
    );
  }, [carrito]);

  function agregarProducto(producto) {
    const productoExiste = carrito.find((item) => item.id === producto.id);

    let nuevoCarrito;

    if (productoExiste) {
      nuevoCarrito = carrito.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: Number(item.cantidad || 0) + 1,
            }
          : item
      );
    } else {
      nuevoCarrito = [
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    }

    guardarYActualizar(nuevoCarrito);
  }

  function aumentarCantidad(id) {
    const nuevoCarrito = carrito.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            cantidad: Number(producto.cantidad || 0) + 1,
          }
        : producto
    );

    guardarYActualizar(nuevoCarrito);
  }

  function disminuirCantidad(id) {
    const nuevoCarrito = carrito
      .map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: Number(producto.cantidad || 0) - 1,
            }
          : producto
      )
      .filter((producto) => Number(producto.cantidad || 0) > 0);

    guardarYActualizar(nuevoCarrito);
  }

  function eliminarProducto(id) {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    guardarYActualizar(nuevoCarrito);
  }

  function vaciarCarrito() {
    guardarYActualizar([]);
  }

  function calcularTotal() {
    return totalCarrito;
  }

  const value = {
    carrito,
    cantidad: cantidadProductos,
    cantidadProductos,
    totalCarrito,
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