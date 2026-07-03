import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

const STORAGE_KEY = 'carrito';
const EVENTO_CARRITO = 'carrito-cambio';

const rutas = [
  { nombre: 'Inicio', path: '/' },
  { nombre: 'Nosotros', path: '/nosotros' },
  { nombre: 'Cursos', path: '/cursos' },
  { nombre: 'Productos', path: '/productos' },
  { nombre: 'Ofertas', path: '/ofertas' },
  { nombre: 'Tienda', path: '/tienda' },
  { nombre: 'Contacto', path: '/contacto' },
];

function contarDesdeStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return 0;
    }

    const carrito = JSON.parse(data);

    if (!Array.isArray(carrito)) {
      return 0;
    }

    return carrito.reduce((total, producto) => {
      return total + Number(producto.cantidad || 0);
    }, 0);
  } catch (error) {
    console.error('Error leyendo contador:', error);
    return 0;
  }
}

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cantidadNavbar, setCantidadNavbar] = useState(() => contarDesdeStorage());

  const auth = useAuth();
  const carrito = useCarrito();

  const usuario = auth?.user ?? null;
  const cerrarSesion = auth?.cerrarSesion;

  const cantidadCarrito = Math.max(
    Number(carrito?.cantidadProductos || 0),
    Number(cantidadNavbar || 0)
  );

  useEffect(() => {
    function actualizarNavbar(event) {
      if (Array.isArray(event.detail)) {
        const cantidad = event.detail.reduce((total, producto) => {
          return total + Number(producto.cantidad || 0);
        }, 0);

        setCantidadNavbar(cantidad);
      } else {
        setCantidadNavbar(contarDesdeStorage());
      }
    }

    window.addEventListener(EVENTO_CARRITO, actualizarNavbar);

    return () => {
      window.removeEventListener(EVENTO_CARRITO, actualizarNavbar);
    };
  }, []);

  useEffect(() => {
    setCantidadNavbar(contarDesdeStorage());
  }, [carrito?.cantidadProductos]);

  const claseEnlace = ({ isActive }) =>
    `whitespace-nowrap rounded-xl px-3 py-2 text-sm font-extrabold transition ${
      isActive
        ? 'bg-blue-50 text-blue-700'
        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700'
    }`;

  const claseCarrito = ({ isActive }) =>
    `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-extrabold transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
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
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={cerrarMenuMovil} className="shrink-0 leading-tight">
          <p className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
            MTECGY <span className="text-blue-700">Academic</span>
          </p>

          <p className="mt-1 hidden text-xs font-bold text-slate-500 sm:block sm:text-sm">
            Educación y tecnología
          </p>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {rutas.map((ruta) => (
            <NavLink key={ruta.path} to={ruta.path} className={claseEnlace}>
              {ruta.nombre}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <NavLink to="/carrito" className={claseCarrito}>
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

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <NavLink
            to="/carrito"
            onClick={cerrarMenuMovil}
            className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-extrabold text-white shadow-md shadow-blue-100 sm:px-4 sm:text-sm"
          >
            Carrito ({cantidadCarrito})
          </NavLink>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-xs font-extrabold text-slate-800 sm:px-4 sm:text-sm"
            onClick={() => setMenuAbierto((estado) => !estado)}
            aria-label="Abrir menú de navegación"
          >
            {menuAbierto ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </nav>

      {menuAbierto && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
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

            <NavLink
              to="/carrito"
              onClick={cerrarMenuMovil}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-extrabold text-white"
            >
              Carrito ({cantidadCarrito})
            </NavLink>

            <div className="mt-3 grid gap-2 border-t border-slate-200 pt-3">
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