import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import './carrito.css';

export default function Carrito() {
  const { carrito, aumentarCantidad, disminuirCantidad, eliminarProducto, vaciarCarrito, calcularTotal } = useCarrito();
  const [mensajeCompra, setMensajeCompra] = useState('');

  function finalizarCompra() {
    if (!carrito || carrito.length === 0) {
      setMensajeCompra('Tu carrito está vacío.');
      return;
    }
    setMensajeCompra('¡Compra realizada con éxito! Gracias por tu compra.');
    vaciarCarrito();
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Carrito de compras</h1>
      {!carrito || carrito.length === 0 ? (
        <div className="alert alert-info text-center">Tu carrito está vacío.</div>
      ) : (
        <div className="card shadow">
          <div className="card-header bg-dark text-white">Productos agregados</div>
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead><tr><th>Imagen</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acción</th></tr></thead>
              <tbody>
                {carrito.map(p=> (
                  <tr key={p.id}>
                    <td>{p.imagen ? <img src={p.imagen} alt={p.nombre} style={{width:60,height:60,objectFit:'cover',borderRadius:8}} /> : <span className="text-muted">Sin imagen</span>}</td>
                    <td>{p.nombre}</td>
                    <td><span className="badge bg-info">{p.categoria}</span></td>
                    <td>{new Intl.NumberFormat('es-PE',{style:'currency',currency:'USD'}).format(p.precio)}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={()=>disminuirCantidad(p.id)}>-</button>
                        <span>{p.cantidad}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={()=>aumentarCantidad(p.id)}>+</button>
                      </div>
                    </td>
                    <td><strong>{new Intl.NumberFormat('es-PE',{style:'currency',currency:'USD'}).format(p.precio * p.cantidad)}</strong></td>
                    <td><button className="btn btn-danger btn-sm" onClick={()=>eliminarProducto(p.id)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h4 className="mb-0">Total: {new Intl.NumberFormat('es-PE',{style:'currency',currency:'USD'}).format(calcularTotal())}</h4>
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={finalizarCompra}>Finalizar compra</button>
              <button className="btn btn-outline-danger" onClick={vaciarCarrito}>Vaciar carrito</button>
            </div>
          </div>
        </div>
      )}
      {mensajeCompra && <div className="alert alert-success mt-3 text-center">{mensajeCompra}</div>}
    </div>
  );
}
