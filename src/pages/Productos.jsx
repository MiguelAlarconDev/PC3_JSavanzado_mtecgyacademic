import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';
import './productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [buscador, setBuscador] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const carrito = useCarrito();

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      const data = await productService.obtenerProductos();
      setProductos(data);
      setProductosFiltrados(data);
      extraerCategorias(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setProductosFiltrados([]);
    }
  }

  function extraerCategorias(list) {
    const cats = Array.from(new Set(list.map(p => p.categoria)));
    setCategorias(['Todas', ...cats]);
  }

  function filtrar() {
    const filtered = productos.filter(p => {
      const cumpleBusqueda = p.nombre.toLowerCase().includes(buscador.toLowerCase());
      const cumpleCategoria = categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada;
      return cumpleBusqueda && cumpleCategoria;
    });
    setProductosFiltrados(filtered);
  }

  useEffect(() => { filtrar(); }, [buscador, categoriaSeleccionada, productos]);

  function agregarAlCarrito(producto) {
    carrito.agregarProducto(producto);
  }

  const formatoPrecio = (v) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <div className="productos-container">
      <div className="container py-5">
        <h1 className="mb-4">Nuestros productos</h1>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={buscador}
              onChange={e => setBuscador(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={categoriaSeleccionada}
              onChange={e => setCategoriaSeleccionada(e.target.value)}
            >
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="row g-4">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm">
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} style={{height:200, objectFit:'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-muted">{producto.categoria}</p>
                  <p className="card-text">
                    {producto.stock > 0 ? (
                      <small style={{color: producto.stock <=5 ? 'orange' : 'green', fontWeight:'bold'}}>Stock: {producto.stock}</small>
                    ) : (
                      <small style={{color:'red', fontWeight:'bold'}}>Sin stock</small>
                    )}
                  </p>
                  <p className="h5 text-primary mb-3">{formatoPrecio(producto.precio)}</p>
                </div>
                <div className="card-footer bg-white">
                  <button className="btn btn-primary w-100" disabled={producto.stock === 0} onClick={() => agregarAlCarrito(producto)}>
                    {producto.stock > 0 ? 'Agregar al Carrito' : 'No disponible'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="alert alert-info mt-5 text-center"><p>No se encontraron productos que coincidan con tu búsqueda.</p></div>
        )}
      </div>
    </div>
  );
}
