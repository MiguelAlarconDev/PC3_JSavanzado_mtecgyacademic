import { Link } from 'react-router-dom';

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">
              MTECGYacademic
            </h2>

            <p className="mt-1 text-sm font-semibold text-slate-400">
              Educación y tecnología para estudiantes
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Plataforma académica orientada a cursos digitales, productos
              tecnológicos, ofertas y servicios para fortalecer el aprendizaje
              y crecimiento digital de los estudiantes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">
              Navegación
            </h3>

            <div className="mt-4 grid gap-3">
              <Link
                to="/"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Inicio
              </Link>

              <Link
                to="/nosotros"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Nosotros
              </Link>

              <Link
                to="/cursos"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Cursos
              </Link>

              <Link
                to="/productos"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Productos
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">
              Servicios
            </h3>

            <div className="mt-4 grid gap-3">
              <Link
                to="/ofertas"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Ofertas
              </Link>

              <Link
                to="/tienda"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Tienda
              </Link>

              <Link
                to="/contacto"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Contacto
              </Link>

              <Link
                to="/carrito"
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Carrito
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {anioActual} MTECGYacademic. Todos los derechos reservados.
          </p>

          <p>
            Plataforma académica y tecnológica.
          </p>
        </div>
      </div>
    </footer>
  );
}