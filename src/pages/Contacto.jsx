import { useState } from 'react';
import contactService from '../services/contactService';

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  function manejarCambio(e) {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });

    setErrores({
      ...errores,
      [name]: '',
    });

    setMensajeExito('');
    setMensajeError('');
  }

  function validarFormulario() {
    const nuevosErrores = {};
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (!correoRegex.test(formulario.correo)) {
      nuevosErrores.correo = 'Ingresa un correo válido.';
    }

    if (!formulario.asunto.trim()) {
      nuevosErrores.asunto = 'El asunto es obligatorio.';
    } else if (formulario.asunto.trim().length < 4) {
      nuevosErrores.asunto = 'El asunto debe tener al menos 4 caracteres.';
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.';
    } else if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return nuevosErrores;
  }

  async function manejarEnvio(e) {
    e.preventDefault();

    const validaciones = validarFormulario();

    if (Object.keys(validaciones).length > 0) {
      setErrores(validaciones);
      setMensajeExito('');
      setMensajeError('');
      return;
    }

    try {
      setEnviando(true);
      setMensajeExito('');
      setMensajeError('');

      const nuevoMensaje = {
        nombre: formulario.nombre.trim(),
        correo: formulario.correo.trim(),
        asunto: formulario.asunto.trim(),
        mensaje: formulario.mensaje.trim(),
        fecha: new Date().toISOString(),
      };

      await contactService.enviarMensajeContacto(nuevoMensaje);

      setMensajeExito(
        'Tu mensaje fue enviado correctamente. MTECGYacademic se comunicará contigo pronto.'
      );

      setFormulario({
        nombre: '',
        correo: '',
        asunto: '',
        mensaje: '',
      });

      setErrores({});
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setMensajeError(
        'No se pudo enviar el mensaje. Verifica que JSON Server esté activo.'
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            Contacto MTECGYacademic
          </span>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Solicita información
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Completa el formulario para recibir información sobre cursos,
              productos tecnológicos, ofertas o servicios académicos de
              MTECGYacademic.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-blue-50 p-5">
                <h2 className="text-base font-extrabold text-slate-950">
                  Atención académica
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Orientación para estudiantes interesados en fortalecer sus
                  habilidades digitales.
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-5">
                <h2 className="text-base font-extrabold text-slate-950">
                  Cursos y tienda
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Consulta información sobre cursos disponibles, productos,
                  promociones y servicios.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-5">
                <h2 className="text-base font-extrabold text-slate-950">
                  Respuesta rápida
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tu solicitud será registrada y luego revisada y atendida por el equipo MTECGY.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={manejarEnvio}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            noValidate
          >
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-slate-950">
                Formulario de contacto
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ingresa tus datos correctamente. Todos los campos son
                obligatorios.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Nombre completo
                </label>

                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ejemplo: Yulisa Nayra"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                    errores.nombre
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />

                {errores.nombre && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {errores.nombre}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formulario.correo}
                  onChange={manejarCambio}
                  placeholder="ejemplo@correo.com"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                    errores.correo
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />

                {errores.correo && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {errores.correo}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="asunto"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Asunto
                </label>

                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formulario.asunto}
                  onChange={manejarCambio}
                  placeholder="Ejemplo: Información sobre cursos"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                    errores.asunto
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />

                {errores.asunto && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {errores.asunto}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="mensaje"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Mensaje
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  placeholder="Escribe tu consulta..."
                  className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                    errores.mensaje
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />

                {errores.mensaje && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {errores.mensaje}
                  </p>
                )}
              </div>
            </div>

            {mensajeExito && (
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                {mensajeExito}
              </div>
            )}

            {mensajeError && (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {mensajeError}
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              className={`mt-7 w-full rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-md transition ${
                enviando
                  ? 'cursor-not-allowed bg-slate-400'
                  : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700'
              }`}
            >
              {enviando ? 'Mensaje enviado' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}