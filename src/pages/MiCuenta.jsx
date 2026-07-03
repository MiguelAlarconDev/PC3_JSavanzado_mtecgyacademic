import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function MiCuenta(){
  const auth = useAuth();
  const u = auth.getUsuarioActual();
  return (
    <div style={{padding:20}}>
      <h2>Mi cuenta</h2>
      {u ? (
        <div className="card p-3">
          <p><strong>Nombre:</strong> {u.nombre}</p>
          <p><strong>Correo:</strong> {u.correo}</p>
          <p><strong>Rol:</strong> {u.role}</p>
        </div>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </div>
  );
}
