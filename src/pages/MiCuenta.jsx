import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

export default function MiCuenta() {
  const auth = useAuth();
  const carrito = useCarrito();

  const usuario = auth?.user;
  const cantidadCarrito = carrito?.cantidadProductos ?? 0;

  const totalCarrito =
    typeof carrito?.totalCarrito === 'function'
      ? carrito.totalCarrito()
      : carrito?.totalCarrito ?? 0;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  function formatearFecha(fecha) {
    if (!fecha) {
      return 'No registrada';
    }

    return new Date(fecha).toLocaleString('es-PE', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  }

  function cerrarSesion() {
    auth.cerrarSesion();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex rounded-full bg-white/80 px-5 py-2 text-sm font-extrabold text-blue-700 shadow-sm ring-1 ring-blue-100">
            Mi cuenta
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Bienvenido,{' '}
            <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
              {usuario.nombre}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Ahora puedes revisar tu información de acceso, consultar
            el estado de tu carrito y navegar rápidamente por la plataforma.
          </p>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-xl shadow-blue-200/40 backdrop-blur">
            <div className="h-32 bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-400" />

            <div className="px-8 pb-8">
              <div className="-mt-14 flex flex-col">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-blue-700 to-cyan-400 text-5xl font-black text-white shadow-xl shadow-blue-300">
                  {usuario.nombre?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <div className="mt-6">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">
                    Perfil del usuario
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950">
                    {usuario.nombre}
                  </h2>

                  <span
                    className={`mt-5 inline-flex rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider ${
                      usuario.role === 'admin'
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {usuario.role === 'admin'
                      ? 'Administrador'
                      : 'Usuario registrado'}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-500">
                    Correo electrónico
                  </p>

                  <p className="mt-2 break-all text-sm font-extrabold text-blue-800">
                    {usuario.correo}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-cyan-500">
                      Rol de acceso
                    </p>

                    <p className="mt-2 text-sm font-extrabold text-slate-800">
                      {usuario.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-500">
                      Estado
                    </p>

                    <p className="mt-2 text-sm font-extrabold text-emerald-700">
                      Cuenta activa
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Fecha de registro
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-slate-800">
                    {formatearFecha(usuario.fechaRegistro)}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="w-full rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-extrabold text-red-600 shadow-sm transition hover:bg-red-100 hover:text-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </article>

          <div className="grid gap-8">
            <section className="grid gap-5 sm:grid-cols-3">
              <article className="rounded-[1.5rem] border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-500 p-6 text-white shadow-lg shadow-blue-200">
                <p className="text-sm font-bold text-blue-100">
                  Productos en carrito
                </p>

                <p className="mt-3 text-4xl font-black">{cantidadCarrito}</p>

                <p className="mt-3 text-xs font-bold text-blue-100">
                  Actualizado en tiempo real
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-cyan-100 bg-gradient-to-br from-cyan-500 to-sky-500 p-6 text-white shadow-lg shadow-cyan-200">
                <p className="text-sm font-bold text-cyan-50">
                  Total estimado
                </p>

                <p className="mt-3 text-4xl font-black">
                  S/ {Number(totalCarrito).toFixed(2)}
                </p>

                <p className="mt-3 text-xs font-bold text-cyan-50">
                  Según productos agregados
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-200">
                <p className="text-sm font-bold text-emerald-50">Estado</p>

                <p className="mt-3 text-4xl font-black">Activo</p>

                <p className="mt-3 text-xs font-bold text-emerald-50">
                  Sesión iniciada
                </p>
              </article>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-blue-100 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                Accesos rápidos
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Continúa navegando en MTECGY Academic
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Puedes revisar cursos, productos, ofertas y tu carrito de compras
                desde esta sección.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Link
                  to="/cursos"
                  className="group rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
                    C
                  </div>

                  <p className="text-lg font-black text-slate-950">
                    Ver cursos
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Explora cursos disponibles en la plataforma.
                  </p>
                </Link>

                <Link
                  to="/productos"
                  className="group rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-5 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-lg font-black text-white">
                    P
                  </div>

                  <p className="text-lg font-black text-slate-950">
                    Ver productos
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Revisa herramientas, materiales y recursos académicos.
                  </p>
                </Link>

                <Link
                  to="/ofertas"
                  className="group rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 text-lg font-black text-white">
                    O
                  </div>

                  <p className="text-lg font-black text-slate-950">
                    Ver ofertas
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Consulta promociones disponibles.
                  </p>
                </Link>

                <Link
                  to="/carrito"
                  className="group rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-black text-white">
                    C
                  </div>

                  <p className="text-lg font-black text-slate-950">
                    Ir al carrito
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Revisa los productos agregados a tu carrito.
                  </p>
                </Link>
              </div>

              {usuario.role === 'admin' && (
                <div className="mt-7 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
                  <p className="text-sm font-extrabold text-blue-700">
                    Tienes permisos de administrador.
                  </p>

                  <Link
                    to="/dashboard"
                    className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                  >
                    Ir al panel administrativo
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}