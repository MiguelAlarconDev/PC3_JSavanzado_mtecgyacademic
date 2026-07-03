import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const USUARIOS_DEMO = [
  {
    id: 1,
    nombre: 'Administrador',
    correo: 'admin@mtecgy.com',
    password: 'Admin123',
    role: 'admin',
  },
  {
    id: 2,
    nombre: 'Usuario Demo',
    correo: 'user@mtecgy.com',
    password: 'User1234',
    role: 'user',
  },
];

function leerJSONLocalStorage(clave, valorInicial) {
  try {
    const valorGuardado = localStorage.getItem(clave);
    return valorGuardado ? JSON.parse(valorGuardado) : valorInicial;
  } catch (error) {
    console.error(`Error al leer ${clave} desde localStorage:`, error);
    return valorInicial;
  }
}

function limpiarCorreo(correo) {
  return correo.trim().toLowerCase();
}

function obtenerUsuariosRegistrados() {
  const usuarios = leerJSONLocalStorage('usuarios', []);
  return Array.isArray(usuarios) ? usuarios : [];
}

function crearSesion(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    role: usuario.role || 'user',
    fechaRegistro: usuario.fechaRegistro || null,
  };
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return leerJSONLocalStorage('usuario', null);
  });

  const navigate = useNavigate();

  function iniciarSesion(correo, password) {
    const correoLimpio = limpiarCorreo(correo);

    const usuarioDemo = USUARIOS_DEMO.find(
      (usuario) =>
        limpiarCorreo(usuario.correo) === correoLimpio &&
        usuario.password === password
    );

    const usuariosRegistrados = obtenerUsuariosRegistrados();

    const usuarioRegistrado = usuariosRegistrados.find(
      (usuario) =>
        limpiarCorreo(usuario.correo) === correoLimpio &&
        usuario.password === password
    );

    const usuarioEncontrado = usuarioDemo || usuarioRegistrado;

    if (!usuarioEncontrado) {
      return false;
    }

    const usuarioSesion = crearSesion(usuarioEncontrado);

    localStorage.setItem('usuario', JSON.stringify(usuarioSesion));
    localStorage.setItem('sesion_token', `token_${Date.now()}`);
    setUser(usuarioSesion);

    return usuarioSesion;
  }

  function registrarUsuario(datosUsuario) {
    const usuariosRegistrados = obtenerUsuariosRegistrados();
    const correoLimpio = limpiarCorreo(datosUsuario.correo);

    const existeEnRegistrados = usuariosRegistrados.some(
      (usuario) => limpiarCorreo(usuario.correo) === correoLimpio
    );

    const existeEnDemo = USUARIOS_DEMO.some(
      (usuario) => limpiarCorreo(usuario.correo) === correoLimpio
    );

    if (existeEnRegistrados || existeEnDemo) {
      return {
        ok: false,
        mensaje: 'El correo electrónico ya está registrado.',
      };
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: datosUsuario.nombre.trim(),
      correo: correoLimpio,
      password: datosUsuario.password,
      role: 'user',
      fechaRegistro: new Date().toISOString(),
    };

    const usuariosActualizados = [...usuariosRegistrados, nuevoUsuario];

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

    return {
      ok: true,
      usuario: nuevoUsuario,
      usuarios: usuariosActualizados,
      mensaje: 'Registro exitoso. Ya puedes iniciar sesión en MTECGY Academic.',
    };
  }

  function cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('sesion_token');
    setUser(null);
    navigate('/login');
  }

  const usuariosDemo = USUARIOS_DEMO.map((usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    role: usuario.role,
  }));

  const value = {
    user,
    isLoggedIn: Boolean(user),
    usuariosDemo,
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    getUsuarioActual: () => user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}