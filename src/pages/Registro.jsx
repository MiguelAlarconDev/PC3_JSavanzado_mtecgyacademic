import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const [usuarios, setUsuarios] = useState(() => {
    try {
      const raw = localStorage.getItem('usuarios');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error al leer usuarios desde localStorage:', error);
      return [];
    }
  });

  const auth = useAuth();

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarPassword(passwordValor) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordValor);
  }

  function registrarUsuario(e) {
    e.preventDefault();

    setMensajeError('');
    setMensajeExito('');

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    if (!nombreLimpio || !correoLimpio || !password) {
      setMensajeError('Todos los campos son obligatorios.');
      return;
    }

    if (nombreLimpio.length < 3) {
      setMensajeError('El nombre debe tener al menos 3 caracteres.');
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

    const resultado = auth.registrarUsuario({
      nombre: nombreLimpio,
      correo: correoLimpio,
      password,
    });

    if (!resultado.ok) {
      setMensajeError(resultado.mensaje);
      return;
    }

    setUsuarios(resultado.usuarios);
    setMensajeExito('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
    setNombre('');
    setCorreo('');
    setPassword('');
  }

  function formatearFecha(fecha) {
    return new Date(fecha).toLocaleString('es-PE', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            Registro MTECGY Academic
          </span>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <form
            onSubmit={registrarUsuario}
            className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-blue-100"
            noValidate
          >
            <div className="mb-7">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                Crear cuenta
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Regístrate para formar parte de MTECGY Academic y acceder a una
                experiencia académica más personalizada.
              </p>
            </div>

            {mensajeError && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-700">
                {mensajeError}
              </div>
            )}

            {mensajeExito && (
              <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-emerald-700">
                  {mensajeExito}
                </p>

                <Link
                  to="/login"
                  className="mt-4 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700"
                >
                  Iniciar sesión
                </Link>
              </div>
            )}

            <div className="grid gap-5">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Nombre completo
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ejemplo: Yulisa Nayra"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Contraseña
                </label>

                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input
                    id="password"
                    type={mostrarPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crea una contraseña segura"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarPassword((estado) => !estado)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
                  >
                    {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
              >
                Registrarse
              </button>
            </div>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Acceso
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-600">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="font-extrabold text-blue-700 hover:text-blue-800"
              >
                Inicia sesión aquí
              </Link>
            </p>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-extrabold text-slate-800">
                Requisitos de contraseña
              </p>

              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>Mínimo 8 caracteres.</li>
                <li>Al menos una letra mayúscula.</li>
                <li>Al menos un número.</li>
              </ul>
            </div>
          </form>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              Comunidad
            </span>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
              Usuarios registrados
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Esta sección muestra los usuarios registrados localmente en la
              plataforma. Por seguridad visual, no se muestran las contraseñas.
            </p>

            <div className="mt-6">
              {usuarios.length === 0 ? (
                <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5 text-sm font-semibold text-sky-700">
                  No hay usuarios registrados aún.
                </div>
              ) : (
                <div className="space-y-3">
                  {usuarios.map((usuario) => (
                    <article
                      key={usuario.correo}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h3 className="text-sm font-extrabold uppercase text-slate-950">
                        {usuario.nombre}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-blue-700">
                        {usuario.correo}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        Rol: {usuario.role || 'usuario'}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        Registrado el:{' '}
                        {usuario.fechaRegistro
                          ? formatearFecha(usuario.fechaRegistro)
                          : 'Sin fecha registrada'}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}