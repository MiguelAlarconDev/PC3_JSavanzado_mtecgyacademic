import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

export default function Carrito() {
  const {
    carrito,
    cantidadProductos,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    calcularTotal,
  } = useCarrito();

  const [mensajeCompra, setMensajeCompra] = useState('');

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(Number(valor));

  function finalizarCompra() {
    if (!carrito || carrito.length === 0) {
      setMensajeCompra('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }

    setMensajeCompra('Compra registrada correctamente. Gracias por confiar en MTECGYacademic.');
    vaciarCarrito();
  }

  const total = calcularTotal();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            Carrito MTECGYacademic
          </span>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Carrito de compras
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Revisa tus productos seleccionados y confirma tu pedido.
            </p>
          </div>

          {mensajeCompra && (
            <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700">
              {mensajeCompra}
            </div>
          )}

          {!carrito || carrito.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-950">
                Tu carrito está vacío
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Agrega productos desde la tienda o desde el catálogo de productos.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/productos"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
                >
                  Ver productos
                </Link>

                <Link
                  to="/tienda"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
                >
                  Ir a la tienda
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-lg font-extrabold text-slate-950">
                    Productos elegidos
                  </h2>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {cantidadProductos} unidades
                  </span>
                </div>

                <div className="space-y-3">
                  {carrito.map((producto) => (
                    <article
                      key={producto.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="grid gap-3 sm:grid-cols-[82px_1fr_auto] sm:items-center">
                        <div className="overflow-hidden rounded-xl bg-white">
                          {producto.imagen ? (
                            <img
                              src={producto.imagen}
                              alt={producto.nombre}
                              className="h-20 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-20 items-center justify-center text-xs font-semibold text-slate-400">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="mb-1 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-blue-700">
                              {producto.categoria || 'Producto'}
                            </span>
                          </div>

                          <h3 className="line-clamp-1 text-sm font-extrabold text-slate-950">
                            {producto.nombre}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                            {producto.descripcion}
                          </p>

                          <p className="mt-2 text-sm font-extrabold text-blue-700">
                            {formatoPrecio(producto.precio)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:items-end">
                          <div className="flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
                            <button
                              type="button"
                              onClick={() => disminuirCantidad(producto.id)}
                              className="px-3 py-1.5 text-base font-extrabold text-slate-700 transition hover:bg-slate-100"
                              aria-label="Disminuir cantidad"
                            >
                              −
                            </button>

                            <span className="min-w-10 border-x border-slate-300 px-3 py-1.5 text-center text-xs font-extrabold text-slate-900">
                              {producto.cantidad}
                            </span>

                            <button
                              type="button"
                              onClick={() => aumentarCantidad(producto.id)}
                              className="px-3 py-1.5 text-base font-extrabold text-slate-700 transition hover:bg-slate-100"
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-sm font-extrabold text-slate-950">
                            {formatoPrecio(producto.precio * producto.cantidad)}
                          </p>

                          <button
                            type="button"
                            onClick={() => eliminarProducto(producto.id)}
                            className="text-xs font-extrabold text-red-600 transition hover:text-red-700"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                <h2 className="text-xl font-extrabold text-slate-950">
                  Resumen
                </h2>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-500">
                      Productos distintos
                    </span>

                    <span className="font-extrabold text-slate-900">
                      {carrito.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-500">
                      Unidades
                    </span>

                    <span className="font-extrabold text-slate-900">
                      {cantidadProductos}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-extrabold text-slate-950">
                        Total
                      </span>

                      <span className="text-2xl font-extrabold text-blue-700">
                        {formatoPrecio(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={finalizarCompra}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
                >
                  Finalizar compra
                </button>

                <button
                  type="button"
                  onClick={vaciarCarrito}
                  className="mt-3 w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-extrabold text-red-600 transition hover:bg-red-100"
                >
                  Vaciar carrito
                </button>

                <Link
                  to="/productos"
                  className="mt-3 block rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-extrabold text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
                >
                  Seguir comprando
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}