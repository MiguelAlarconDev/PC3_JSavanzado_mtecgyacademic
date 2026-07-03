import { useEffect, useState } from 'react';
import OfferCard from '../components/OfferCard';
import productService from '../services/productService';

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarOfertas() {
      try {
        setCargando(true);
        setError('');

        const data = await productService.obtenerOfertas();
        setOfertas(data);
      } catch (err) {
        console.error('Error cargando ofertas:', err);
        setError(
          'No se pudieron cargar las ofertas. Verifica que JSON Server esté activo.'
        );
        setOfertas([]);
      } finally {
        setCargando(false);
      }
    }

    cargarOfertas();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            Ofertas MTECGYacademic
          </span>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Ofertas disponibles
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Promociones especiales en cursos, paquetes académicos y productos
              tecnológicos para estudiantes.
            </p>
          </div>

          {cargando && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center font-semibold text-blue-700">
              Cargando ofertas...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-semibold text-red-700">
              {error}
            </div>
          )}

          {!cargando && !error && ofertas.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ofertas.map((oferta) => (
                <OfferCard key={oferta.id} oferta={oferta} />
              ))}
            </div>
          )}

          {!cargando && !error && ofertas.length === 0 && (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                No hay ofertas disponibles
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