import React, { useState } from 'react';

export default function Contacto(){
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  function enviarMensaje(){
    alert('Mensaje enviado por: ' + nombre);
    setNombre(''); setCorreo(''); setMensaje('');
  }

  return (
    <section className="contenedor" style={{padding:20}}>
      <h2>Contacto</h2>
      <div className="card p-4">
        <label>Nombre completo:</label>
        <input type="text" className="form-control mb-3" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <label>Correo electrónico:</label>
        <input type="email" className="form-control mb-3" value={correo} onChange={e=>setCorreo(e.target.value)} />
        <label>Mensaje:</label>
        <textarea className="form-control mb-3" value={mensaje} onChange={e=>setMensaje(e.target.value)} />
        <button className="btn btn-primary" onClick={enviarMensaje}>Enviar mensaje</button>
      </div>
    </section>
  );
}
