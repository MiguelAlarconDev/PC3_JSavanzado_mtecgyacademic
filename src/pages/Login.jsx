import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validarPassword(pw) {
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(pw);
  }

  function iniciarSesion() {
    setMensajeError('');
    setMensajeExito('');
    const correoL = correo.trim();
    if (!correoL || !password) {
      setMensajeError('Todos los campos son obligatorios.');
      return;
    }
    if (!validarEmail(correoL)) {
      setMensajeError('Ingrese un correo electrónico válido.');
      return;
    }
    if (!validarPassword(password)) {
      setMensajeError('La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.');
      return;
    }

    if (auth.iniciarSesion(correoL, password)) {
      setMensajeExito('Inicio de sesión exitoso. Redirigiendo...');
      setTimeout(() => navigate('/dashboard'), 800);
    } else {
      setMensajeError('Correo o contraseña incorrectos.');
    }
  }

  const credencialesDemo = [
    { correo: 'admin@mtecgy.com', password: 'Admin123', nombre: 'Administrador' },
    { correo: 'user@mtecgy.com', password: 'User1234', nombre: 'Usuario Demo' }
  ];

  return (
    <main className="login-container">
      <div className="container">
        <div className="row justify-content-center min-vh-100 align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className="card login-card shadow-lg">
              <div className="card-header text-center bg-primary text-white py-4">
                <h2 className="mb-2">Iniciar sesión</h2>
                <p className="mb-0 small">Accede a tu cuenta de MTecGY Academy</p>
              </div>
              <div className="card-body p-4">
                {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
                {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

                <div className="mb-3">
                  <label className="form-label fw-bold">Correo electrónico</label>
                  <input type="email" className="form-control form-control-lg" placeholder="correo@ejemplo.com" value={correo} onChange={e=>setCorreo(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Contraseña</label>
                  <div className="input-group input-group-lg">
                    <input type={mostrarPassword ? 'text' : 'password'} className="form-control" placeholder="Ingrese su contraseña" value={password} onChange={e=>setPassword(e.target.value)} />
                    <button className="btn btn-outline-secondary" type="button" onClick={()=>setMostrarPassword(s=>!s)}>{mostrarPassword ? 'Ocultar' : 'Mostrar'}</button>
                  </div>
                </div>

                <button type="button" className="btn btn-primary btn-lg w-100 mb-3" onClick={iniciarSesion}>Iniciar sesión</button>

                <div className="d-flex align-items-center my-4"><hr className="flex-grow-1" /><span className="mx-2 text-muted small">O prueba con</span><hr className="flex-grow-1" /></div>

                <div className="credentials-demo">
                  <p className="small text-muted mb-2">Credenciales de prueba:</p>
                  {credencialesDemo.map(c=> (
                    <button key={c.correo} type="button" className="btn btn-sm btn-outline-secondary w-100 mb-2" onClick={()=>{setCorreo(c.correo); setPassword(c.password);}}>{c.correo} ({c.nombre})</button>
                  ))}
                </div>

                <hr className="my-4" />
                <p className="text-center mb-0">¿No tienes una cuenta? <Link to="/registro" className="text-primary fw-bold">Regístrate aquí</Link></p>
              </div>
            </div>
            <div className="card mt-3 bg-light border-0">
              <div className="card-body small">
                <p className="mb-2"><strong>Requisitos de contraseña:</strong></p>
                <ul className="ps-3 mb-0"><li>Mínimo 8 caracteres</li><li>Al menos una mayúscula</li><li>Al menos un número</li></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
