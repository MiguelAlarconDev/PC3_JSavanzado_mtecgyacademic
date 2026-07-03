import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const carrito = useCarrito();

  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        setError('');

        const data = await productService.obtenerProductos();

        setProductos(data);
        setProductosFiltrados(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(
          'No se pudieron cargar los productos. Verifica que JSON Server esté activo con npm run server.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  useEffect(() => {
    let resultado = [...productos];

    if (categoria !== 'Todas') {
      resultado = resultado.filter(
        (producto) =>
          producto.categoria?.toLowerCase() === categoria.toLowerCase()
      );
    }

    if (busqueda.trim() !== '') {
      const textoBusqueda = busqueda.trim().toLowerCase();

      resultado = resultado.filter((producto) => {
        const nombre = producto.nombre?.toLowerCase() || '';
        const descripcion = producto.descripcion?.toLowerCase() || '';
        const categoriaProducto = producto.categoria?.toLowerCase() || '';

        return (
          nombre.includes(textoBusqueda) ||
          descripcion.includes(textoBusqueda) ||
          categoriaProducto.includes(textoBusqueda)
        );
      });
    }

    setProductosFiltrados(resultado);
  }, [busqueda, categoria, productos]);

  const categorias = [
    'Todas',
    ...new Set(productos.map((producto) => producto.categoria).filter(Boolean)),
  ];

  function handleAgregarProducto(producto) {
    if (!carrito || typeof carrito.agregarProducto !== 'function') {
      console.error('No se pudo conectar con el carrito.');
      return;
    }

    carrito.agregarProducto(producto);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-extrabold text-blue-700">
            Productos
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Recursos tecnológicos para tu aprendizaje
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Explora productos académicos y tecnológicos disponibles en MTECGY
            Academic. Puedes filtrar, buscar y agregar productos al carrito.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            etiqueta="Catálogo"
            titulo="Productos disponibles"
            descripcion="La información se obtiene dinámicamente desde JSON Server usando Fetch API."
          />

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
              <div>
                <label
                  htmlFor="busqueda"
                  className="mb-2 block text-sm font-extrabold text-slate-700"
                >
                  Buscar producto
                </label>

                <input
                  id="busqueda"
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, descripción o categoría"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="categoria"
                  className="mb-2 block text-sm font-extrabold text-slate-700"
                >
                  Categoría
                </label>

                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {categorias.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {cargando && (
            <div className="mt-10 rounded-[2rem] border border-blue-100 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-black text-slate-950">
                Cargando productos...
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Verifica que JSON Server esté ejecutándose.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-10 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          {!cargando && !error && productosFiltrados.length === 0 && (
            <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-black text-slate-950">
                No se encontraron productos
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Intenta con otra búsqueda o categoría.
              </p>
            </div>
          )}

          {!cargando && !error && productosFiltrados.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onAgregar={handleAgregarProducto}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}