import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CourseCard from '../components/CourseCard';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const carrito = useCarrito();

  useEffect(() => {
    async function cargarDatosTienda() {
      try {
        setCargando(true);
        setError('');

        const [productosData, cursosData, ofertasData] = await Promise.all([
          productService.obtenerProductos(),
          productService.obtenerCursos(),
          productService.obtenerOfertas(),
        ]);

        setProductos(productosData.slice(0, 4));
        setCursos(cursosData.slice(0, 4));
        setOfertas(ofertasData.slice(0, 2));
      } catch (err) {
        console.error('Error cargando tienda:', err);
        setError(
          'No se pudo cargar la tienda. Verifica que JSON Server esté activo.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarDatosTienda();
  }, []);

  function agregarAlCarrito(producto) {
    if (!carrito || typeof carrito.agregarProducto !== 'function') {
      console.error('No se pudo conectar con el carrito.');
      return;
    }

    carrito.agregarProducto(producto);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            Tienda MTECGYacademic
          </span>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Cursos, productos y ofertas para tu crecimiento digital
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Encuentra recursos académicos, productos tecnológicos y promociones
              seleccionadas para estudiantes que desean aprender y avanzar.
            </p>
          </div>

          {cargando && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center font-semibold text-blue-700">
              Cargando tienda...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-semibold text-red-700">
              {error}
            </div>
          )}

          {!cargando && !error && (
            <>
              <section className="mb-14">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                      Selección tecnológica
                    </span>

                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                      Productos destacados
                    </h2>
                  </div>

                  <Link
                    to="/productos"
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
                  >
                    Ver productos
                  </Link>
                </div>

                {productos.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productos.map((producto) => (
                      <ProductCard
                        key={producto.id}
                        producto={producto}
                        onAgregar={agregarAlCarrito}
                      />
                    ))}
                  </div>
                )}
              </section>

              <section className="mb-14">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                      Formación recomendada
                    </span>

                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                      Cursos recomendados
                    </h2>
                  </div>

                  <Link
                    to="/cursos"
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
                  >
                    Ver cursos
                  </Link>
                </div>

                {cursos.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cursos.map((curso) => (
                      <CourseCard key={curso.id} curso={curso} />
                    ))}
                  </div>
                )}
              </section>

              <section>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                        Promociones
                      </span>

                      <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                        Ofertas para estudiantes
                      </h2>
                    </div>

                    <Link
                      to="/ofertas"
                      className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
                    >
                      Ver ofertas
                    </Link>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {ofertas.map((oferta) => (
                      <article
                        key={oferta.id}
                        className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-extrabold text-white">
                              {oferta.descuento} dscto.
                            </span>

                            <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                              {oferta.titulo}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {oferta.descripcion}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-sm font-bold text-slate-400 line-through">
                              S/ {oferta.precioAnterior}
                            </p>

                            <p className="text-xl font-extrabold text-blue-700">
                              S/ {oferta.precioOferta}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}