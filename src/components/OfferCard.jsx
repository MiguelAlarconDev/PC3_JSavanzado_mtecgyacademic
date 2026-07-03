export default function OfferCard({ oferta }) {
  const formatoPrecio = (valor) =>
    new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(Number(valor));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={oferta.imagen}
          alt={oferta.titulo}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-extrabold text-white shadow-md">
          -{oferta.descuento}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-4 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          Oferta especial
        </span>

        <h3 className="text-lg font-extrabold leading-tight text-slate-950">
          {oferta.titulo}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {oferta.descripcion}
        </p>

        <div className="mt-5">
          <p className="text-sm font-bold text-slate-400 line-through">
            Antes: {formatoPrecio(oferta.precioAnterior)}
          </p>

          <p className="mt-1 text-xl font-extrabold text-blue-700">
            Ahora: {formatoPrecio(oferta.precioOferta)}
          </p>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
        >
          Ver promoción
        </button>
      </div>
    </article>
  );
}