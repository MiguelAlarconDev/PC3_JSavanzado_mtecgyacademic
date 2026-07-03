import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const rutas = [
  { nombre: 'Inicio', path: '/' },
  { nombre: 'Nosotros', path: '/nosotros' },
  { nombre: 'Cursos', path: '/cursos' },
  { nombre: 'Productos', path: '/productos' },
  { nombre: 'Ofertas', path: '/ofertas' },
  { nombre: 'Tienda', path: '/tienda' },
  { nombre: 'Contacto', path: '/contacto' },
];

function obtenerCantidadCarrito() {
  try {
    const carritoGuardado = localStorage.getItem('carrito');
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    return carrito.reduce(
      (total, producto) => total + Number(producto.cantidad || 0),
      0
    );
  } catch (error) {
    console.error('Error al leer cantidad del carrito:', error);
    return 0;
  }
}

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(obtenerCantidadCarrito);

  const auth = useAuth();
  const usuario = auth?.user ?? null;
  const cerrarSesion = auth?.cerrarSesion;

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCantidadCarrito(obtenerCantidadCarrito());
    }, 500);

    return () => clearInterval(intervalo);
  }, []);

  const claseEnlace = ({ isActive }) =>
    `whitespace-nowrap rounded-xl px-3 py-2 text-sm font-extrabold transition ${
      isActive
        ? 'bg-blue-50 text-blue-700'
        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700'
    }`;

  function cerrarMenuMovil() {
    setMenuAbierto(false);
  }

  function handleCerrarSesion() {
    if (cerrarSesion) {
      cerrarSesion();
    }

    setMenuAbierto(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-6 px-6 py-4">
        <Link
          to="/"
          onClick={cerrarMenuMovil}
          className="shrink-0 leading-tight"
        >
          <p className="text-2xl font-black tracking-tight text-slate-950">
            MTECGY <span className="text-blue-700">académico</span>
          </p>

          <p className="mt-1 text-sm font-bold text-slate-500">
            Educación y tecnología
          </p>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-2 2xl:flex">
          {rutas.map((ruta) => (
            <NavLink key={ruta.path} to={ruta.path} className={claseEnlace}>
              {ruta.nombre}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 2xl:flex">
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-extrabold transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
              }`
            }
          >
            Carrito ({cantidadCarrito})
          </NavLink>

          {usuario ? (
            <>
              <NavLink
                to="/mi-cuenta"
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-extrabold transition ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'
                  }`
                }
              >
                Mi cuenta
              </NavLink>

              {usuario.role === 'admin' && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-extrabold transition ${
                      isActive
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`
                  }
                >
                  Panel
                </NavLink>
              )}

              <button
                type="button"
                onClick={handleCerrarSesion}
                className="whitespace-nowrap rounded-xl bg-red-50 px-4 py-2 text-sm font-extrabold text-red-600 transition hover:bg-red-100"
              >
                Salir
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-extrabold transition ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'
                }`
              }
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-extrabold text-slate-800 2xl:hidden"
          onClick={() => setMenuAbierto((estado) => !estado)}
          aria-label="Abrir menú de navegación"
        >
          {menuAbierto ? 'Cerrar' : 'Menú'}
        </button>
      </nav>

      {menuAbierto && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg 2xl:hidden">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-2">
            {rutas.map((ruta) => (
              <NavLink
                key={ruta.path}
                to={ruta.path}
                className={claseEnlace}
                onClick={cerrarMenuMovil}
              >
                {ruta.nombre}
              </NavLink>
            ))}

            <div className="mt-3 grid gap-2 border-t border-slate-200 pt-3">
              <NavLink
                to="/carrito"
                onClick={cerrarMenuMovil}
                className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-extrabold text-white"
              >
                Carrito ({cantidadCarrito})
              </NavLink>

              {usuario ? (
                <>
                  <NavLink
                    to="/mi-cuenta"
                    onClick={cerrarMenuMovil}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-extrabold text-slate-700"
                  >
                    Mi cuenta
                  </NavLink>

                  {usuario.role === 'admin' && (
                    <NavLink
                      to="/dashboard"
                      onClick={cerrarMenuMovil}
                      className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-extrabold text-white"
                    >
                      Panel
                    </NavLink>
                  )}

                  <button
                    type="button"
                    onClick={handleCerrarSesion}
                    className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-extrabold text-red-600"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={cerrarMenuMovil}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-extrabold text-slate-700"
                >
                  Iniciar sesión
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}