import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('usuario');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    // nothing extra for now
  }, []);

  const iniciarSesion = (correo, password) => {
    if (correo === 'admin@mtecgy.com' && password === 'Admin123') {
      const usuario = { id: 1, nombre: 'Administrador', correo, role: 'admin' };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('sesion_token', 'token_' + Date.now());
      setUser(usuario);
      return true;
    }

    if (correo === 'user@mtecgy.com' && password === 'User1234') {
      const usuario = { id: 2, nombre: 'Usuario Demo', correo, role: 'user' };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('sesion_token', 'token_' + Date.now());
      setUser(usuario);
      return true;
    }

    return false;
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('sesion_token');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    isLoggedIn: !!user,
    iniciarSesion,
    cerrarSesion,
    getUsuarioActual: () => user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
