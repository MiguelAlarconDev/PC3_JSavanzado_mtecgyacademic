import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CarritoContext = createContext(null);
const STORAGE_KEY = 'carrito';
const EVENTO_CARRITO = 'carrito-cambio';

export function useCarrito() {
  return useContext(CarritoContext);
}

function leerCarrito() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    const carrito = JSON.parse(data);

    if (!Array.isArray(carrito)) {
      return [];
    }

    return carrito;
  } catch (error) {
    console.error('Error leyendo carrito:', error);
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));

  window.dispatchEvent(
    new CustomEvent(EVENTO_CARRITO, {
      detail: carrito,
    })
  );
}

function contarProductos(carrito) {
  return carrito.reduce((total, producto) => {
    return total + Number(producto.cantidad || 0);
  }, 0);
}

function calcularTotalCarrito(carrito) {
  return carrito.reduce((total, producto) => {
    const precio = Number(producto.precioOferta ?? producto.precio ?? 0);
    const cantidad = Number(producto.cantidad || 0);

    return total + precio * cantidad;
  }, 0);
}

function prepararProducto(producto) {
  return {
    id: producto.id,
    nombre: producto.nombre || producto.titulo || 'Producto',
    descripcion: producto.descripcion || '',
    categoria: producto.categoria || 'Producto',
    imagen: producto.imagen || '',
    precio: Number(producto.precioOferta ?? producto.precio ?? 0),
    stock: producto.stock ?? null,
    cantidad: 1,
  };
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => leerCarrito());
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    function sincronizarCarrito(event) {
      if (Array.isArray(event.detail)) {
        setCarrito(event.detail);
      } else {
        setCarrito(leerCarrito());
      }
    }

    window.addEventListener(EVENTO_CARRITO, sincronizarCarrito);

    return () => {
      window.removeEventListener(EVENTO_CARRITO, sincronizarCarrito);
    };
  }, []);

  const cantidadProductos = useMemo(() => {
    return contarProductos(carrito);
  }, [carrito]);

  const totalCarrito = useMemo(() => {
    return calcularTotalCarrito(carrito);
  }, [carrito]);

  function mostrarToast(texto) {
    setMensaje(texto);
    setMostrarMensaje(true);

    setTimeout(() => {
      setMostrarMensaje(false);
    }, 2500);
  }

  function agregarProducto(producto) {
    if (!producto || producto.id === undefined || producto.id === null) {
      mostrarToast('No se pudo agregar el producto.');
      return;
    }

    const carritoActual = leerCarrito();

    const existe = carritoActual.find(
      (item) => String(item.id) === String(producto.id)
    );

    let nuevoCarrito;

    if (existe) {
      nuevoCarrito = carritoActual.map((item) =>
        String(item.id) === String(producto.id)
          ? {
              ...item,
              cantidad: Number(item.cantidad || 0) + 1,
            }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, prepararProducto(producto)];
    }

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    mostrarToast(`${producto.nombre || producto.titulo} fue agregado al carrito.`);
  }

  function aumentarCantidad(id) {
    const carritoActual = leerCarrito();

    const nuevoCarrito = carritoActual.map((producto) =>
      String(producto.id) === String(id)
        ? {
            ...producto,
            cantidad: Number(producto.cantidad || 0) + 1,
          }
        : producto
    );

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  }

  function disminuirCantidad(id) {
    const carritoActual = leerCarrito();

    const nuevoCarrito = carritoActual
      .map((producto) =>
        String(producto.id) === String(id)
          ? {
              ...producto,
              cantidad: Number(producto.cantidad || 0) - 1,
            }
          : producto
      )
      .filter((producto) => Number(producto.cantidad || 0) > 0);

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  }

  function eliminarProducto(id) {
    const carritoActual = leerCarrito();

    const nuevoCarrito = carritoActual.filter(
      (producto) => String(producto.id) !== String(id)
    );

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    mostrarToast('Producto eliminado del carrito.');
  }

  function vaciarCarrito() {
    setCarrito([]);
    guardarCarrito([]);
    mostrarToast('Carrito vaciado correctamente.');
  }

  function calcularTotal() {
    return calcularTotalCarrito(carrito);
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

      {mostrarMensaje && (
        <div className="fixed left-4 right-4 top-24 z-[9999] sm:left-auto sm:right-6 sm:w-[380px]">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-extrabold text-emerald-700 shadow-2xl shadow-emerald-100">
            <p>{mensaje}</p>
            <p className="mt-1 text-xs font-bold text-emerald-600">
              Ahora tienes {cantidadProductos} producto(s) en el carrito.
            </p>
          </div>
        </div>
      )}
    </CarritoContext.Provider>
  );
}