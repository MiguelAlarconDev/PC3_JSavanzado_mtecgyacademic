import SectionTitle from '../components/SectionTitle';

export default function Nosotros() {
  const pilares = [
    {
      numero: '01',
      titulo: 'Formación digital',
      descripcion:
        'Cursos orientados a programación, diseño web, bases de datos, gestión de proyectos, ciberseguridad y metodologías ágiles.',
      fondo: 'from-slate-900 to-blue-900',
      detalle: 'border-blue-300/20',
    },
    {
      numero: '02',
      titulo: 'Tienda tecnológica',
      descripcion:
        'Productos seleccionados para estudiantes que necesitan herramientas útiles para estudiar, programar, organizarse y trabajar mejor.',
      fondo: 'from-slate-900 to-violet-900',
      detalle: 'border-violet-300/20',
    },
    {
      numero: '03',
      titulo: 'Apoyo académico',
      descripcion:
        'Servicios de orientación y acompañamiento para fortalecer habilidades digitales y mejorar el desempeño académico.',
      fondo: 'from-slate-900 to-emerald-900',
      detalle: 'border-emerald-300/20',
    },
  ];

  const valores = [
    'Aprendizaje práctico',
    'Acceso a tecnología',
    'Crecimiento académico',
    'Orientación clara',
    'Acompañamiento estudiantil',
  ];

  const oferta = [
    'Cursos de programación y desarrollo web',
    'Capacitaciones en herramientas digitales',
    'Productos tecnológicos para estudiantes',
    'Ofertas académicas y paquetes promocionales',
    'Asesoría para fortalecer habilidades digitales',
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 shadow-xl">
            <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-14">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/15">
                  Nosotros MTECGYacademic
                </span>

                <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Educación, tecnología y apoyo académico en un solo lugar
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100">
                  MTECGYacademic es una empresa orientada a estudiantes que
                  desean fortalecer sus habilidades digitales, acceder a cursos
                  prácticos y encontrar productos tecnológicos útiles para su
                  desarrollo académico.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Nuestra propuesta
                </p>

                <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
                  Aprender, equiparse y avanzar
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Integramos cursos, productos, ofertas y servicios académicos
                  para que los estudiantes puedan prepararse mejor en el mundo
                  digital.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-blue-50 p-4 text-center">
                    <p className="text-lg font-extrabold text-blue-700">
                      Cursos
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Digitales
                    </p>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-4 text-center">
                    <p className="text-lg font-extrabold text-sky-700">
                      Tienda
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Académica
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                    <p className="text-lg font-extrabold text-emerald-700">
                      Apoyo
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Estudiantil
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              Nuestra empresa
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Una plataforma pensada para estudiantes que quieren crecer
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              En MTECGYacademic reunimos alternativas de aprendizaje,
              herramientas tecnológicas y servicios académicos para acompañar a
              quienes desean mejorar sus competencias digitales.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Nuestra visión es ofrecer una experiencia clara, práctica y
              cercana, donde cada estudiante encuentre recursos útiles para
              estudiar, practicar y avanzar en su formación.
            </p>
          </div>

          <div className="grid gap-5">
            {pilares.map((pilar) => (
              <article
                key={pilar.numero}
                className={`group overflow-hidden rounded-3xl border ${pilar.detalle} bg-gradient-to-br ${pilar.fondo} p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-extrabold text-white ring-1 ring-white/20">
                    {pilar.numero}
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {pilar.titulo}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-200">
                      {pilar.descripcion}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            etiqueta="Valores y oferta"
            titulo="Lo que guía y ofrece MTECGYacademic"
            descripcion="Nuestra empresa combina valores claros con una propuesta académica y tecnológica pensada para estudiantes."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                    Nuestros valores
                  </span>

                  <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                    Principios que nos representan
                  </h2>
                </div>

                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-sm font-extrabold text-white shadow-md shadow-blue-200 sm:flex">
                  VAL
                </div>
              </div>

              <div className="space-y-3">
                {valores.map((valor, index) => (
                  <div
                    key={valor}
                    className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-extrabold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="text-sm font-bold text-slate-800">
                      {valor}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.22em] text-violet-600">
                    Nuestra oferta
                  </span>

                  <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                    Soluciones para crecer digitalmente
                  </h2>
                </div>

                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-sm font-extrabold text-white shadow-md shadow-violet-200 sm:flex">
                  OFR
                </div>
              </div>

              <div className="space-y-3">
                {oferta.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-xs font-extrabold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="text-sm font-bold text-slate-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-8 text-center shadow-xl md:p-12">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Aprende, equipa tu espacio y fortalece tu futuro digital
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-blue-50">
            En MTECGYacademic conectamos a los estudiantes con cursos,
            productos y servicios que aportan valor a su crecimiento personal,
            académico y profesional.
          </p>
        </div>
      </section>
    </main>
  );
}