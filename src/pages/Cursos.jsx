import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import productService from '../services/productService';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarCursos() {
      try {
        setCargando(true);
        setError('');

        const data = await productService.obtenerCursos();
        setCursos(data);
      } catch (err) {
        console.error('Error cargando cursos:', err);
        setError(
          'No se pudieron cargar los cursos. Verifica que JSON Server esté activo.'
        );
        setCursos([]);
      } finally {
        setCargando(false);
      }
    }

    cargarCursos();
  }, []);

  const nivelesUnicos = Array.from(new Set(cursos.map((curso) => curso.nivel)));

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.7fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700">
              Cursos MTECGYacademic
            </span>

            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Formación práctica para crecer en el mundo digital
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Cursos orientados a programación, diseño web, herramientas
              digitales y desarrollo tecnológico para fortalecer tus habilidades
              académicas y profesionales.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-100">
            <h2 className="text-xl font-extrabold text-slate-950">
              Aprende con enfoque práctico
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-blue-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-blue-700">
                  {cursos.length}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  Cursos
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-sky-700">
                  {nivelesUnicos.length}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  Niveles
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-emerald-700">
                  100%
                </p>
                <p className="text-xs font-bold text-slate-500">
                  En línea
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Cursos disponibles
            </h2>
          </div>

          {cargando && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center font-semibold text-blue-700">
              Cargando cursos...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-semibold text-red-700">
              {error}
            </div>
          )}

          {!cargando && !error && cursos.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cursos.map((curso) => (
                <CourseCard key={curso.id} curso={curso} />
              ))}
            </div>
          )}

          {!cargando && !error && cursos.length === 0 && (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                No hay cursos disponibles
              </h2>

              <p className="mt-2 text-slate-600">
                Verifica que JSON Server esté funcionando correctamente.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}