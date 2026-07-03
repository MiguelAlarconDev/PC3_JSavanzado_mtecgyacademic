export default function ProductCard({ producto, onAgregar }) {
  const precio = Number(producto.precioOferta ?? producto.precio ?? 0);

  function handleClick() {
    if (typeof onAgregar === 'function') {
      onAgregar(producto);
    }
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-3xl font-black text-white">
            {producto.nombre?.charAt(0) || 'P'}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
          {producto.categoria || 'Producto'}
        </span>

        <h3 className="text-lg font-black text-slate-950">
          {producto.nombre}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {producto.descripcion}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Precio
            </p>

            <p className="text-2xl font-black text-blue-700">
              S/ {precio.toFixed(2)}
            </p>
          </div>

          <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
            Stock: {producto.stock ?? 'Disponible'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}