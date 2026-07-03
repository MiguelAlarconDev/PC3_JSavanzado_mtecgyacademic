const API_BASE = 'https://mtecgyacademic-api.onrender.com';

export async function obtenerProductos() {
  const res = await fetch(`${API_BASE}/productos`);
  if (!res.ok) throw new Error('Error fetching productos');
  return res.json();
}

export async function obtenerProducto(id) {
  const res = await fetch(`${API_BASE}/productos/${id}`);
  if (!res.ok) throw new Error('Error fetching producto');
  return res.json();
}

export async function buscarProductos(termino) {
  const res = await fetch(`${API_BASE}/productos?nombre_like=${encodeURIComponent(termino)}`);
  if (!res.ok) throw new Error('Error searching productos');
  return res.json();
}

export async function obtenerPorCategoria(categoria) {
  const res = await fetch(`${API_BASE}/productos?categoria=${encodeURIComponent(categoria)}`);
  if (!res.ok) throw new Error('Error fetching productos por categoria');
  return res.json();
}

export default { obtenerProductos, obtenerProducto, buscarProductos, obtenerPorCategoria };
