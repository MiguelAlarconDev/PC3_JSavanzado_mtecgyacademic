import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import { useCarrito } from '../context/CarritoContext';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeCarrito, setMensajeCarrito] = useState('');

  const carrito = useCarrito();

  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        setError('');

        const data = await productService.obtenerProductos();

        setProductos(data);
        setProductosFiltrados(data);

        const categoriasUnicas = Array.from(
          new Set(data.map((producto) => producto.categoria))
        );

        setCategorias(['Todas', ...categoriasUnicas]);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError(
          'No se pudieron cargar los productos. Verifica que JSON Server esté activo.'
        );
        setProductos([]);
        setProductosFiltrados([]);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  useEffect(() => {
    const resultado = productos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === 'Todas' ||
        producto.categoria === categoriaSeleccionada;

      return coincideBusqueda && coincideCategoria;
    });

    setProductosFiltrados(resultado);
  }, [busqueda, categoriaSeleccionada, productos]);

  function agregarAlCarrito(producto) {
    console.log('Producto recibido en Productos.jsx:', producto);

    if (!carrito || typeof carrito.agregarProducto !== 'function') {
      console.error('El contexto del carrito no está disponible.');
      setMensajeCarrito('No se pudo agregar el producto. Revisa el carrito.');
      return;
    }

    carrito.agregarProducto(producto);
    setMensajeCarrito(`${producto.nombre} se agregó al carrito.`);

    setTimeout(() => {
      setMensajeCarrito('');
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            Productos MTECGYacademic
          </span>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Productos disponibles
            </h1>
          </div>

          {mensajeCarrito && (
            <div className="fixed right-5 top-24 z-[999] max-w-sm rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700 shadow-lg">
              {mensajeCarrito}
            </div>
          )}

          <div className="mx-auto mb-8 grid max-w-3xl gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[1fr_220px]">
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          {cargando && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center font-semibold text-blue-700">
              Cargando productos...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center font-semibold text-red-700">
              {error}
            </div>
          )}

          {!cargando && !error && productosFiltrados.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onAgregar={agregarAlCarrito}
                />
              ))}
            </div>
          )}

          {!cargando && !error && productosFiltrados.length === 0 && (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                No se encontraron productos
              </h2>

              <p className="mt-2 text-slate-600">
                Intenta buscar con otro nombre o selecciona otra categoría.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}