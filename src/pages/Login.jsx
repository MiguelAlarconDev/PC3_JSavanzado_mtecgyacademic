import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const credencialesDemo = [
    {
      correo: 'admin@mtecgy.com',
      password: 'Admin123',
      nombre: 'Administrador',
    },
    {
      correo: 'user@mtecgy.com',
      password: 'User1234',
      nombre: 'Usuario Demo',
    },
  ];

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarPassword(passwordValor) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordValor);
  }

  function iniciarSesion(e) {
    e.preventDefault();

    setMensajeError('');
    setMensajeExito('');

    const correoLimpio = correo.trim();

    if (!correoLimpio || !password) {
      setMensajeError('Todos los campos son obligatorios.');
      return;
    }

    if (!validarEmail(correoLimpio)) {
      setMensajeError('Ingresa un correo electrónico válido.');
      return;
    }

    if (!validarPassword(password)) {
      setMensajeError(
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.'
      );
      return;
    }

    const usuarioAutenticado = auth.iniciarSesion(correoLimpio, password);

    if (usuarioAutenticado) {
      setMensajeExito('Inicio de sesión exitoso. Redirigiendo...');

      setTimeout(() => {
        navigate(usuarioAutenticado.role === 'admin' ? '/dashboard' : '/mi-cuenta');
      }, 800);
    } else {
      setMensajeError('Correo o contraseña incorrectos.');
    }
  }

  function usarCredencialDemo(credencial) {
    setCorreo(credencial.correo);
    setPassword(credencial.password);
    setMensajeError('');
    setMensajeExito('');
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              Iniciar sesión
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950">
              Accede a tu cuenta de MTECGY Académico
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-600">
              Ingresa con tus credenciales para acceder a las opciones internas
              de la plataforma.
            </p>

            <div className="mt-10 max-w-xl rounded-[2rem] border border-blue-100 bg-blue-50 p-7">
              <h2 className="text-2xl font-extrabold text-slate-950">
                Credenciales de prueba
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Puedes usar una cuenta demo para validar el acceso.
              </p>

              <div className="mt-7 grid gap-4">
                {credencialesDemo.map((credencial) => (
                  <button
                    key={credencial.correo}
                    type="button"
                    onClick={() => usarCredencialDemo(credencial)}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span className="text-sm font-extrabold text-slate-800">
                      {credencial.correo}
                    </span>

                    <span className="text-xs font-bold text-slate-400">
                      {credencial.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={iniciarSesion}
            className="mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-blue-100"
            noValidate
          >
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-950">
                Iniciar sesión
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Completa los campos para ingresar a tu cuenta.
              </p>
            </div>

            {mensajeError && (
              <div className="mb-7 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-700">
                {mensajeError}
              </div>
            )}

            {mensajeExito && (
              <div className="mb-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
                {mensajeExito}
              </div>
            )}

            <div className="grid gap-7">
              <div>
                <label
                  htmlFor="correo"
                  className="mb-3 block text-sm font-extrabold text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-3 block text-sm font-extrabold text-slate-700"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={mostrarPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-24 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarPassword((estado) => !estado)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                  >
                    {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-9">
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
              >
                Iniciar sesión
              </button>
            </div>

            <div className="my-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Cuenta nueva
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-600">
              ¿No tienes una cuenta?{' '}
              <Link
                to="/registro"
                className="font-extrabold text-blue-700 hover:text-blue-800"
              >
                Regístrate aquí
              </Link>
            </p>

            <div className="mt-9 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm font-extrabold text-slate-800">
                Requisitos de contraseña
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Mínimo 8 caracteres.</li>
                <li>Al menos una letra mayúscula.</li>
                <li>Al menos un número.</li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}