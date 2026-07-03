import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registro.css';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [usuarios, setUsuarios] = useState(() => {
    try { const raw = localStorage.getItem('usuarios'); return raw ? JSON.parse(raw) : []; } catch { return []; }
  });

  const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validarPassword = (p) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(p);

  function correoDuplicado(c) { return usuarios.some(u => u.correo === c); }

  function registrarUsuario() {
    setMensajeError(''); setMensajeExito('');
    if (!nombre || !correo || !password) { setMensajeError('Todos los campos son obligatorios.'); return; }
    if (!validarEmail(correo)) { setMensajeError('Correo electrónico inválido.'); return; }
    if (!validarPassword(password)) { setMensajeError('La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.'); return; }
    if (correoDuplicado(correo)) { setMensajeError('El correo electrónico ya está registrado.'); return; }

    const nuevo = { nombre, correo, fechaRegistro: new Date().toISOString() };
    const next = [...usuarios, nuevo];
    setUsuarios(next);
    localStorage.setItem('usuarios', JSON.stringify(next));
    setMensajeExito('¡Registro exitoso! Bienvenido a MTecGY Academy.');
    setNombre(''); setCorreo(''); setPassword('');
  }

  return (
    <main className="contenedor registro-container" style={{padding:20}}>
      <div className="card registro-card" style={{maxWidth:700, margin:'0 auto', padding:20}}>
        <h2>Crear cuenta</h2>
        <p className="texto-registro">Regístrate en MTecGY Academy</p>
        {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
        {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" value={correo} onChange={e=>setCorreo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn-registro w-100 btn btn-primary" onClick={registrarUsuario}>Registrarse</button>

        <p className="texto-login mt-3">¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>

        <div className="usuarios-registrados mt-3">
          <h3>Usuarios registrados</h3>
          {usuarios.length === 0 ? (
            <p>No hay usuarios registrados aún.</p>
          ) : (
            <ul className="lista-usuarios">
              {usuarios.map(u => (
                <li key={u.correo}><strong>{u.nombre.toUpperCase()}</strong> - {u.correo}<br/><small>Registrado el: {new Date(u.fechaRegistro).toLocaleString()}</small></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
