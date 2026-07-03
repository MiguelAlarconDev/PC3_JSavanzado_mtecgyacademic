export default function ProductCard({ producto, onAgregar }) {
  const formatoPrecio = (valor) =>
    new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(Number(valor || 0));

  const stockProducto =
    producto.stock !== undefined && producto.stock !== null
      ? Number(producto.stock)
      : null;

  const tieneStock = stockProducto === null || stockProducto > 0;

  function manejarAgregar() {
    console.log('Click en agregar producto:', producto);

    if (typeof onAgregar === 'function') {
      onAgregar(producto);
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden bg-slate-100">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            {producto.categoria || 'Producto'}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {stockProducto === null ? 'Disponible' : `Stock: ${stockProducto}`}
          </span>
        </div>

        <h3 className="text-lg font-extrabold leading-tight text-slate-950">
          {producto.nombre}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {producto.descripcion}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-slate-500">
            Precio
          </span>

          <span className="text-lg font-extrabold text-blue-700">
            {formatoPrecio(producto.precio)}
          </span>
        </div>

        <button
          type="button"
          disabled={!tieneStock}
          onClick={manejarAgregar}
          className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-extrabold transition ${
            tieneStock
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700'
              : 'cursor-not-allowed bg-slate-200 text-slate-500'
          }`}
        >
          {tieneStock ? 'Agregar al carrito' : 'No disponible'}
        </button>
      </div>
    </article>
  );
}