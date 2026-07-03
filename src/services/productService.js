const API_BASE = 'http://localhost:3000';

async function manejarRespuesta(respuesta, mensajeError) {
  if (!respuesta.ok) {
    throw new Error(mensajeError);
  }

  return respuesta.json();
}

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_BASE}/productos`);
  return manejarRespuesta(respuesta, 'Error al obtener los productos');
}

export async function obtenerProducto(id) {
  const respuesta = await fetch(`${API_BASE}/productos/${id}`);
  return manejarRespuesta(respuesta, 'Error al obtener el producto');
}

export async function obtenerCursos() {
  const respuesta = await fetch(`${API_BASE}/cursos`);
  return manejarRespuesta(respuesta, 'Error al obtener los cursos');
}

export async function obtenerOfertas() {
  const respuesta = await fetch(`${API_BASE}/ofertas`);
  return manejarRespuesta(respuesta, 'Error al obtener las ofertas');
}

export async function obtenerServicios() {
  const respuesta = await fetch(`${API_BASE}/servicios`);
  return manejarRespuesta(respuesta, 'Error al obtener los servicios');
}

export async function buscarProductos(termino) {
  const productos = await obtenerProductos();

  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(termino.toLowerCase())
  );
}

export async function obtenerPorCategoria(categoria) {
  const productos = await obtenerProductos();

  if (categoria === 'Todas' || categoria === 'Todos') {
    return productos;
  }

  return productos.filter((producto) => producto.categoria === categoria);
}

const productService = {
  obtenerProductos,
  obtenerProducto,
  obtenerCursos,
  obtenerOfertas,
  obtenerServicios,
  buscarProductos,
  obtenerPorCategoria,
};

export default productService;