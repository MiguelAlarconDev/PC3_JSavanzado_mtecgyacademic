import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const carrito = useCarrito();

  useEffect(()=>{ cargarProductos(); }, []);

  async function cargarProductos(){
    try{ const data = await productService.obtenerProductos(); setProductos(data); } catch (err){ console.error(err); }
  }

  const totalProductos = productos.length;
  const totalPaginas = Math.ceil(totalProductos / productosPorPagina) || 1;
  const paginas = Array.from({length: totalPaginas}, (_,i)=>i+1);

  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosPaginados = productos.slice(inicio, inicio + productosPorPagina);

  function irAPagina(p){ if (p>=1 && p<=totalPaginas) setPaginaActual(p); }

  function agregarAlCarrito(producto){ carrito.agregarProducto(producto); alert(`${producto.nombre} agregado al carrito`); }

  return (
    <div className="tienda-container">
      <div className="container py-5">
        <h1 className="mb-4">Tienda online</h1>
        <div className="table-responsive mb-4">
          <table className="table table-hover">
            <thead className="table-dark"><tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acción</th></tr></thead>
            <tbody>
              {productosPaginados.map(producto => (
                <tr key={producto.id}>
                  <td><img src={producto.imagen} alt={producto.nombre} style={{width:50,height:50,objectFit:'cover',borderRadius:4}}/></td>
                  <td>{producto.nombre.toUpperCase()}</td>
                  <td><span className="badge bg-info">{producto.categoria}</span></td>
                  <td><strong className="text-primary">{new Intl.NumberFormat('es-PE',{style:'currency',currency:'USD'}).format(producto.precio)}</strong></td>
                  <td><span className={producto.stock>0 ? 'badge bg-success' : 'badge bg-danger'}>{producto.stock>0 ? producto.stock + ' disponibles' : 'Sin stock'}</span></td>
                  <td><button className="btn btn-sm btn-primary" disabled={producto.stock===0} onClick={()=>agregarAlCarrito(producto)}>Agregar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Paginación">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${paginaActual===1 ? 'disabled' : ''}`}><button className="page-link" onClick={()=>irAPagina(paginaActual-1)}>Anterior</button></li>
            {paginas.map(p=> <li key={p} className={`page-item ${p===paginaActual ? 'active' : ''}`}><button className="page-link" onClick={()=>irAPagina(p)}>{p}</button></li>)}
            <li className={`page-item ${paginaActual===totalPaginas ? 'disabled' : ''}`}><button className="page-link" onClick={()=>irAPagina(paginaActual+1)}>Siguiente</button></li>
          </ul>
        </nav>
        <p className="text-center text-muted">Mostrando { (paginaActual - 1) * productosPorPagina + 1 } - { Math.min(paginaActual * productosPorPagina, totalProductos) } de { totalProductos } productos</p>
      </div>
    </div>
  );
}
