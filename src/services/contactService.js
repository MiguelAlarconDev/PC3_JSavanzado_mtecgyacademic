const API_BASE = 'http://localhost:3000';

export async function enviarMensajeContacto(mensaje) {
  const respuesta = await fetch(`${API_BASE}/mensajes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mensaje),
  });

  if (!respuesta.ok) {
    throw new Error('Error al enviar el mensaje de contacto');
  }

  return respuesta.json();
}

const contactService = {
  enviarMensajeContacto,
};

export default contactService;