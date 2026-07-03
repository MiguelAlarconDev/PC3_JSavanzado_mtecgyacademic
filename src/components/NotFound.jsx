import { Link } from 'react-router-dom';

export default function NotFound() {
  const accesos = [
    {
      numero: '01',
      titulo: 'Inicio',
      descripcion: 'Regresa a la página principal de MTECGYacademic.',
      ruta: '/',
    },
    {
      numero: '02',
      titulo: 'Cursos',
      descripcion: 'Explora nuestros cursos digitales disponibles.',
      ruta: '/cursos',
    },
    {
      numero: '03',
      titulo: 'Productos',
      descripcion: 'Revisa productos tecnológicos para estudiantes.',
      ruta: '/productos',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
              Página no encontrada
            </span>

            <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-blue-700 sm:text-8xl">
              404
            </h1>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Parece que esta ruta no está disponible
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              La página que intentas visitar no existe o fue movida. Puedes
              regresar al inicio, revisar nuestros cursos o explorar los
              productos tecnológicos de MTECGYacademic.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
              >
                Volver al inicio
              </Link>

              <Link
                to="/contacto"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
              >
                Contactar soporte
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-sky-200 blur-3xl" />

            <div className="relative rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-200">
                MTECGYacademic
              </p>

              <h3 className="mt-4 text-3xl font-extrabold">
                No encontramos esta sección
              </h3>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Pero puedes seguir navegando por las áreas principales de la
                plataforma.
              </p>

              <div className="mt-8 grid gap-4">
                {accesos.map((acceso) => (
                  <Link
                    key={acceso.numero}
                    to={acceso.ruta}
                    className="group rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-extrabold text-blue-700">
                        {acceso.numero}
                      </span>

                      <div>
                        <h4 className="text-base font-extrabold text-white">
                          {acceso.titulo}
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-blue-100">
                          {acceso.descripcion}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}