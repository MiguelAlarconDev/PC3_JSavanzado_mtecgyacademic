import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import productService from '../services/productService';

const imagenesHero = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Estudiantes aprendiendo con tecnología',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    alt: 'Estudiante usando una laptop para aprender en línea',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    alt: 'Desarrollo web y programación',
  },
];

export default function Home() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((actual) =>
        actual === imagenesHero.length - 1 ? 0 : actual + 1
      );
    }, 3500);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    async function cargarServicios() {
      try {
        setCargando(true);
        setError('');

        const data = await productService.obtenerServicios();
        setServicios(data);
      } catch (err) {
        console.error('Error al cargar servicios:', err);
        setError('No se pudieron cargar los servicios de MTECGYacademic.');
      } finally {
        setCargando(false);
      }
    }

    cargarServicios();
  }, []);

  const beneficios = [
    {
      id: 1,
      titulo: 'Cursos para fortalecer tus habilidades',
      descripcion:
        'Accede a cursos de programación, diseño web, herramientas digitales y tecnologías actuales para complementar tu formación académica.',
    },
    {
      id: 2,
      titulo: 'Productos pensados para estudiantes',
      descripcion:
        'Encuentra equipos y accesorios tecnológicos útiles para clases virtuales, trabajos universitarios, programación y productividad.',
    },
    {
      id: 3,
      titulo: 'Aprendizaje con enfoque práctico',
      descripcion:
        'La plataforma está orientada a estudiantes que buscan aprender haciendo, reforzar conocimientos y mejorar su desempeño digital.',
    },
  ];

  const tecnologias = [
    'React',
    'React Router DOM',
    'Tailwind CSS',
    'Fetch API',
    'JSON Server',
    'GitHub',
  ];

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              MTECGYacademic · Educación y tecnología
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Aprende, explora y equipa tu camino digital
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              MTECGYacademic es una plataforma web creada para presentar cursos,
              productos tecnológicos, ofertas y servicios académicos en un solo
              espacio digital moderno, dinámico y fácil de usar.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/cursos"
                className="rounded-2xl bg-blue-600 px-6 py-4 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Ver cursos disponibles
              </Link>

              <Link
                to="/productos"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-center text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
              >
                Explorar tienda
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-blue-700">+4</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Cursos
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-blue-700">+6</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Productos
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-blue-700">100%</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Responsive
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-sky-200 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-100">
              <div className="relative h-[390px] overflow-hidden rounded-[1.5rem] bg-slate-200">
                {imagenesHero.map((imagen, index) => (
                  <img
                    key={imagen.id}
                    src={imagen.url}
                    alt={imagen.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      index === imagenActual ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/75 p-4 shadow-lg backdrop-blur-sm sm:right-auto sm:w-[78%] sm:max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    MTECGYacademic
                  </p>

                  <h2 className="mt-2 text-lg font-extrabold leading-snug text-slate-950 sm:text-xl">
                    Aprende, compra y crece en el mundo digital
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Plataforma académica con cursos, productos tecnológicos,
                    ofertas y servicios para estudiantes.
                  </p>

                  <div className="mt-4 flex gap-2">
                    {imagenesHero.map((imagen, index) => (
                      <button
                        key={imagen.id}
                        type="button"
                        onClick={() => setImagenActual(index)}
                        aria-label={`Ver imagen ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all ${
                          index === imagenActual
                            ? 'w-8 bg-blue-600'
                            : 'w-2.5 bg-slate-300/80 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            etiqueta="Nuestra propuesta"
            titulo="Una plataforma académica con enfoque tecnológico"
            descripcion="MTECGYacademic combina información educativa, catálogo de cursos, productos tecnológicos y servicios pensados para estudiantes que desean crecer en el mundo digital."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {beneficios.map((beneficio) => (
              <article
                key={beneficio.id}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-extrabold text-white">
                  {beneficio.id}
                </div>

                <h3 className="text-xl font-extrabold text-slate-950">
                  {beneficio.titulo}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {beneficio.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              ¿Qué ofrece?
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Cursos, tienda y servicios en una misma experiencia
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              El proyecto permite navegar entre secciones, visualizar datos
              dinámicos desde una base simulada, agregar productos al carrito,
              consultar cursos y acceder a información institucional de la
              plataforma.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/nosotros"
                className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Conocer MTECGYacademic
              </Link>

              <Link
                to="/contacto"
                className="rounded-2xl border border-slate-300 px-6 py-4 text-center text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
              >
                Solicitar información
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="text-lg font-extrabold text-slate-950">
                Catálogo de cursos
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Cursos orientados a programación, diseño web, herramientas
                digitales y desarrollo de habilidades tecnológicas.
              </p>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6">
              <h3 className="text-lg font-extrabold text-slate-950">
                Tienda académica
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Productos tecnológicos útiles para estudiantes, clases
                virtuales, trabajos académicos y productividad.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="text-lg font-extrabold text-slate-950">
                Carrito funcional
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Permite agregar productos, modificar cantidades y conservar la
                información mediante LocalStorage.
              </p>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-violet-50 p-6">
              <h3 className="text-lg font-extrabold text-slate-950">
                Navegación dinámica
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Uso de rutas, páginas internas, página 404 personalizada y
                componentes reutilizables.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            etiqueta="Servicios"
            titulo="Servicios principales de MTECGYacademic"
            descripcion="Esta sección se carga dinámicamente desde JSON Server mediante Fetch API, cumpliendo con el consumo de servicios REST solicitado en el proyecto."
          />

          {cargando && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center font-semibold text-blue-700">
              Cargando servicios...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-semibold text-red-700">
              {error}
            </div>
          )}

          {!cargando && !error && (
            <div className="grid gap-6 md:grid-cols-3">
              {servicios.map((servicio) => (
                <article
                  key={servicio.id}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <h3 className="text-xl font-extrabold text-slate-950">
                    {servicio.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {servicio.descripcion}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-950 p-8 shadow-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-sky-300">
                Tecnologías del proyecto
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                Una aplicación moderna construida con React
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                El proyecto integra rutas, componentes, hooks, renderizado
                dinámico, consumo de datos, formulario, carrito y diseño
                responsive con Tailwind CSS.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tecnologias.map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white"
                >
                  {tecnologia}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/productos"
              className="rounded-2xl bg-white px-6 py-4 text-center text-sm font-extrabold text-slate-950 transition hover:bg-slate-100"
            >
              Ver productos
            </Link>

            <Link
              to="/ofertas"
              className="rounded-2xl border border-white/30 px-6 py-4 text-center text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              Revisar ofertas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}