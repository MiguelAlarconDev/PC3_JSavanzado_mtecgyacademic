import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useAuth } from '../context/AuthContext';
import productService from '../services/productService';

const API_BASE = 'http://localhost:3000';

function leerUsuariosRegistrados() {
  try {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (error) {
    console.error('Error al leer usuarios registrados:', error);
    return [];
  }
}

function formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';

  return new Date(fecha).toLocaleString('es-PE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function obtenerPrecio(item) {
  return Number(item.precioOferta ?? item.precio ?? 0);
}

export default function Dashboard() {
  const auth = useAuth();
  const usuario = auth?.user;

  const [productos, setProductos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const chartLineRef = useRef(null);
  const chartDonutRef = useRef(null);
  const chartLineInstance = useRef(null);
  const chartDonutInstance = useRef(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setCargando(true);
        setError('');

        const [productosData, cursosData, ofertasData, respuestaMensajes] =
          await Promise.all([
            productService.obtenerProductos(),
            productService.obtenerCursos(),
            productService.obtenerOfertas(),
            fetch(`${API_BASE}/mensajes`),
          ]);

        const mensajesData = respuestaMensajes.ok
          ? await respuestaMensajes.json()
          : [];

        setProductos(productosData);
        setCursos(cursosData);
        setOfertas(ofertasData);
        setMensajes(Array.isArray(mensajesData) ? mensajesData : []);
        setUsuariosRegistrados(leerUsuariosRegistrados());
      } catch (err) {
        console.error(err);
        setError(
          'No se pudo cargar la información del dashboard. Verifica que JSON Server esté activo con npm run server.'
        );
        setUsuariosRegistrados(leerUsuariosRegistrados());
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  const resumen = useMemo(() => {
    const catalogo = [...productos, ...cursos];

    const valorCatalogo = catalogo.reduce((total, item) => {
      const precio = obtenerPrecio(item);
      const stock = Number(item.stock ?? 1);
      return total + precio * stock;
    }, 0);

    const stockTotal = catalogo.reduce(
      (total, item) => total + Number(item.stock ?? 0),
      0
    );

    const stockBajo = catalogo.filter((item) => Number(item.stock ?? 0) <= 5);

    return {
      productos: productos.length,
      cursos: cursos.length,
      ofertas: ofertas.length,
      mensajes: mensajes.length,
      usuarios: usuariosRegistrados.length + 2,
      stockTotal,
      stockBajo: stockBajo.length,
      valorCatalogo,
    };
  }, [productos, cursos, ofertas, mensajes, usuariosRegistrados]);

  const actividadReciente = useMemo(() => {
    const actividadMensajes = mensajes.map((mensaje) => ({
      fecha: mensaje.fecha || new Date().toISOString(),
      tipo: 'Mensaje de contacto',
      detalle: mensaje.asunto || 'Consulta recibida desde contacto',
      color: 'blue',
    }));

    const actividadUsuarios = usuariosRegistrados.map((user) => ({
      fecha: user.fechaRegistro || new Date().toISOString(),
      tipo: 'Registro de usuario',
      detalle: user.nombre || user.correo,
      color: 'emerald',
    }));

    const actividadStock = [...productos, ...cursos]
      .filter((item) => Number(item.stock ?? 0) <= 5)
      .slice(0, 4)
      .map((item) => ({
        fecha: new Date().toISOString(),
        tipo: 'Stock bajo',
        detalle: item.nombre || item.titulo,
        color: 'amber',
      }));

    return [...actividadMensajes, ...actividadUsuarios, ...actividadStock]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 6);
  }, [mensajes, usuariosRegistrados, productos, cursos]);

  useEffect(() => {
    if (cargando) return;

    if (chartLineInstance.current) {
      chartLineInstance.current.destroy();
    }

    if (chartDonutInstance.current) {
      chartDonutInstance.current.destroy();
    }

    if (chartLineRef.current) {
      chartLineInstance.current = new Chart(chartLineRef.current, {
        type: 'line',
        data: {
          labels: ['Productos', 'Cursos', 'Ofertas', 'Mensajes', 'Usuarios'],
          datasets: [
            {
              label: 'Indicadores',
              data: [
                resumen.productos,
                resumen.cursos,
                resumen.ofertas,
                resumen.mensajes,
                resumen.usuarios,
              ],
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.12)',
              pointBackgroundColor: '#0891b2',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 3,
              pointRadius: 5,
              tension: 0.35,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 },
            },
          },
        },
      });
    }

    if (chartDonutRef.current) {
      chartDonutInstance.current = new Chart(chartDonutRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Productos', 'Cursos', 'Ofertas'],
          datasets: [
            {
              data: [resumen.productos, resumen.cursos, resumen.ofertas],
              backgroundColor: ['#2563eb', '#06b6d4', '#8b5cf6'],
              borderColor: '#ffffff',
              borderWidth: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                boxWidth: 8,
              },
            },
          },
          cutout: '65%',
        },
      });
    }

    return () => {
      if (chartLineInstance.current) chartLineInstance.current.destroy();
      if (chartDonutInstance.current) chartDonutInstance.current.destroy();
    };
  }, [cargando, resumen]);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.role !== 'admin') {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-amber-100 bg-white p-8 text-center shadow-xl shadow-amber-100">
          <span className="inline-flex rounded-full bg-amber-100 px-5 py-2 text-sm font-extrabold text-amber-700">
            Acceso restringido
          </span>

          <h1 className="mt-6 text-3xl font-black text-slate-950">
            El panel administrativo es solo para administradores
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Tu cuenta está activa, pero no tiene permisos para visualizar el
            dashboard administrativo.
          </p>

          <Link
            to="/mi-cuenta"
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
          >
            Volver a mi cuenta
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-white/80 px-5 py-2 text-sm font-extrabold text-blue-700 shadow-sm ring-1 ring-blue-100">
              Panel administrativo
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Dashboard de MTECGY Academic
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Bienvenido, {usuario.nombre}. Aquí puedes revisar el estado del
              catálogo, cursos, ofertas, mensajes y actividad general de la
              plataforma.
            </p>
          </div>

          <button
            type="button"
            onClick={auth.cerrarSesion}
            className="rounded-2xl border border-red-100 bg-white px-6 py-3 text-sm font-extrabold text-red-600 shadow-sm transition hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {error && (
            <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          {cargando ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-10 text-center shadow-xl shadow-blue-100">
              <p className="text-lg font-black text-slate-950">
                Cargando información del dashboard...
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Asegúrate de tener activo JSON Server con npm run server.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-blue-500 p-6 text-white shadow-lg shadow-blue-200">
                  <p className="text-sm font-bold text-blue-100">
                    Productos
                  </p>
                  <p className="mt-3 text-4xl font-black">{resumen.productos}</p>
                  <p className="mt-3 text-xs font-bold text-blue-100">
                    Registros desde JSON Server
                  </p>
                </article>

                <article className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500 to-sky-500 p-6 text-white shadow-lg shadow-cyan-200">
                  <p className="text-sm font-bold text-cyan-50">Cursos</p>
                  <p className="mt-3 text-4xl font-black">{resumen.cursos}</p>
                  <p className="mt-3 text-xs font-bold text-cyan-50">
                    Información dinámica
                  </p>
                </article>

                <article className="rounded-[1.5rem] bg-gradient-to-br from-violet-500 to-purple-500 p-6 text-white shadow-lg shadow-violet-200">
                  <p className="text-sm font-bold text-violet-50">Ofertas</p>
                  <p className="mt-3 text-4xl font-black">{resumen.ofertas}</p>
                  <p className="mt-3 text-xs font-bold text-violet-50">
                    Promociones activas
                  </p>
                </article>

                <article className="rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-200">
                  <p className="text-sm font-bold text-emerald-50">
                    Mensajes
                  </p>
                  <p className="mt-3 text-4xl font-black">{resumen.mensajes}</p>
                  <p className="mt-3 text-xs font-bold text-emerald-50">
                    Formulario de contacto
                  </p>
                </article>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                <section className="rounded-[2rem] border border-white/70 bg-white/95 p-7 shadow-xl shadow-blue-100 backdrop-blur">
                  <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                        Indicadores
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-slate-950">
                        Resumen general de la plataforma
                      </h2>
                    </div>

                    <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
                      Fetch API + JSON Server
                    </span>
                  </div>

                  <div className="h-80">
                    <canvas ref={chartLineRef} />
                  </div>
                </section>

                <section className="rounded-[2rem] border border-white/70 bg-white/95 p-7 shadow-xl shadow-cyan-100 backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-600">
                    Catálogo
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Distribución
                  </h2>

                  <div className="mt-6 h-72">
                    <canvas ref={chartDonutRef} />
                  </div>
                </section>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <section className="rounded-[2rem] border border-white/70 bg-white/95 p-7 shadow-xl shadow-blue-100 backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                    Actividad reciente
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Últimos movimientos
                  </h2>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    {actividadReciente.length === 0 ? (
                      <div className="bg-slate-50 p-6 text-sm font-bold text-slate-500">
                        Aún no hay actividad reciente para mostrar.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-200">
                        {actividadReciente.map((actividad, index) => (
                          <article
                            key={`${actividad.tipo}-${actividad.fecha}-${index}`}
                            className="grid gap-3 bg-white p-5 transition hover:bg-slate-50 sm:grid-cols-[0.8fr_1fr]"
                          >
                            <div>
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                                  actividad.color === 'emerald'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : actividad.color === 'amber'
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {actividad.tipo}
                              </span>
                              <p className="mt-2 text-xs font-bold text-slate-400">
                                {formatearFecha(actividad.fecha)}
                              </p>
                            </div>

                            <p className="text-sm font-extrabold text-slate-800">
                              {actividad.detalle}
                            </p>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                <aside className="grid gap-6">
                  <section className="rounded-[2rem] border border-white/70 bg-white/95 p-7 shadow-xl shadow-cyan-100 backdrop-blur">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-600">
                      Gestión
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Métricas internas
                    </h2>

                    <div className="mt-6 grid gap-4">
                      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                        <p className="text-xs font-black uppercase tracking-widest text-blue-500">
                          Usuarios registrados
                        </p>
                        <p className="mt-2 text-2xl font-black text-blue-800">
                          {resumen.usuarios}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-500">
                          Stock total
                        </p>
                        <p className="mt-2 text-2xl font-black text-emerald-700">
                          {resumen.stockTotal}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                        <p className="text-xs font-black uppercase tracking-widest text-amber-500">
                          Registros con stock bajo
                        </p>
                        <p className="mt-2 text-2xl font-black text-amber-700">
                          {resumen.stockBajo}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
                        <p className="text-xs font-black uppercase tracking-widest text-violet-500">
                          Valor del catálogo
                        </p>
                        <p className="mt-2 text-2xl font-black text-violet-700">
                          S/ {resumen.valorCatalogo.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-[2rem] border border-white/70 bg-white/95 p-7 shadow-xl shadow-blue-100 backdrop-blur">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                      Acciones rápidas
                    </p>

                    <div className="mt-6 grid gap-3">
                      <Link
                        to="/productos"
                        className="rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-extrabold text-white transition hover:bg-blue-700"
                      >
                        Revisar productos
                      </Link>

                      <Link
                        to="/cursos"
                        className="rounded-2xl bg-cyan-500 px-5 py-4 text-center text-sm font-extrabold text-white transition hover:bg-cyan-600"
                      >
                        Revisar cursos
                      </Link>

                      <Link
                        to="/contacto"
                        className="rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-extrabold text-white transition hover:bg-slate-800"
                      >
                        Ver formulario de contacto
                      </Link>
                    </div>
                  </section>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}