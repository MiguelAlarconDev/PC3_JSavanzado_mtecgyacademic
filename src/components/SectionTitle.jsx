export default function SectionTitle({ etiqueta, titulo, descripcion, centrado = true }) {
  return (
    <div className={centrado ? 'mx-auto mb-10 max-w-3xl text-center' : 'mb-10 max-w-3xl'}>
      {etiqueta && (
        <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
          {etiqueta}
        </span>
      )}

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
        {titulo}
      </h2>

      {descripcion && (
        <p className="mt-4 text-base leading-7 text-slate-600">
          {descripcion}
        </p>
      )}
    </div>
  );
}