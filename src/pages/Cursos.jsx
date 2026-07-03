import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';

export default function Cursos(){
  const [cursos, setCursos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const carrito = useCarrito();

  useEffect(()=>{ productService.getCursos().then(d=>setCursos(d)).catch(()=>alert('Error al cargar los cursos')); }, []);

  const cursosFiltrados = cursos.filter(c=> (categoriaSeleccionada==='Todos' || c.categoria===categoriaSeleccionada) && (textoBusqueda.trim()==='' || c.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())));

  function agregarCarrito(curso){ const item = { id: 'curso-' + curso.id, nombre: curso.nombre, categoria: curso.categoria, precio: curso.precio }; carrito.agregarProducto(item); alert(`${curso.nombre} agregado al carrito`); }

  return (
    <main className="contenedor" style={{padding:20}}>
      <div className="d-flex justify-content-between align-items-center mb-4"><h2>Cursos disponibles</h2></div>
      <div className="mb-4">
        <label className="form-label">Filtrar por categoría</label>
        <select className="form-select" value={categoriaSeleccionada} onChange={e=>setCategoriaSeleccionada(e.target.value)}>
          <option>Todos</option>
          <option>Programación</option>
          <option>Diseño Web</option>
          <option>Base de Datos</option>
          <option>Full Stack</option>
          <option>Gestión</option>
          <option>Ciberseguridad</option>
          <option>Scrum</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="form-label">Buscar curso</label>
        <input type="text" className="form-control" placeholder="Buscar curso..." value={textoBusqueda} onChange={e=>setTextoBusqueda(e.target.value)} />
      </div>

      <div className="cursos">
        {cursosFiltrados.map(c=> (
          <div key={c.id} className="card mb-3 p-3">
            <div style={{display:'flex',gap:12}}>
              <img src={c.imagen} alt={c.nombre} style={{width:120,height:80,objectFit:'cover'}} />
              <div>
                <h3>{c.nombre.toUpperCase()}</h3>
                <p className="docente">Docente: {c.docente}</p>
                <p>{c.descripcion}</p>
                <p>Categoría: <strong>{c.categoria}</strong></p>
                <h4>{c.precio===0 ? 'Gratis' : `S/ ${c.precio.toFixed(2)}`}</h4>
                <p className={c.stock>0 ? 'text-success' : 'text-danger'}>Stock: {c.stock}</p>
                <button className="btn btn-primary" onClick={()=>agregarCarrito(c)}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}

        {cursosFiltrados.length === 0 && <p className="text-center mt-4">No se encontraron cursos con ese criterio.</p>}
      </div>
    </main>
  );
}
