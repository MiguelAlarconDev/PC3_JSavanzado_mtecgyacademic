import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';
import './productos.css';

export default function Ofertas() {
  const [productosEnOferta, setProductosEnOferta] = useState([]);
  const descuentoPorcentaje = 30;
  const carrito = useCarrito();

  useEffect(() => { cargarProductosEnOferta(); }, []);

  async function cargarProductosEnOferta() {
    try {
      const data = await productService.obtenerProductos();
      setProductosEnOferta(data.slice(0, 4));
    } catch (err) { console.error(err); }
  }

  function calcularPrecioConDescuento(precio) { return precio - (precio * descuentoPorcentaje / 100); }

  function agregarAlCarrito(producto) {
    const productoConDescuento = { ...producto, precio: calcularPrecioConDescuento(producto.precio) };
    carrito.agregarProducto(productoConDescuento);
    alert(`${producto.nombre} agregado al carrito con ${descuentoPorcentaje}% de descuento`);
  }

  return (
    <div className="ofertas-container">
      <div className="container py-5">
        <div className="row mb-5 align-items-center">
          <div className="col-md-8"><h1 className="mb-3">Ofertas especiales</h1><p className="lead text-muted">¡Descuentos increíbles en productos seleccionados!</p></div>
          <div className="col-md-4 text-center"><div className="badge-descuento"><span className="descuento-texto">-{descuentoPorcentaje}%</span></div></div>
        </div>
        <div className="row g-4">
          {productosEnOferta.map(producto=> (
            <div key={producto.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm card-oferta" style={{position:'relative'}}>
                <div className="badge bg-danger position-absolute top-0 start-0 m-2">-{descuentoPorcentaje}%</div>
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} style={{height:200,objectFit:'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-muted small">{producto.categoria}</p>
                  <div className="mb-3">
                    <p className="text-muted text-decoration-line-through mb-1">{new Intl.NumberFormat('es-PE',{style:'currency',currency:'USD'}).format(producto.precio)}</p>
                    <p className="h5 text-danger">{new Intl.NumberFormat('es-PE',{style:'currency',currency:'USD'}).format(calcularPrecioConDescuento(producto.precio))}</p>
                  </div>
                  <p className="card-text small">{producto.stock>0 ? <span className="text-success">En stock</span> : <span className="text-danger">Sin stock</span>}</p>
                </div>
                <div className="card-footer bg-white">
                  <button className="btn btn-danger w-100" disabled={producto.stock===0} onClick={()=>agregarAlCarrito(producto)}>Comprar ahora</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
