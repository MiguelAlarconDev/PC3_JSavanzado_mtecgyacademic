import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Ofertas from './pages/Ofertas';
import Tienda from './pages/Tienda';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Cursos from './pages/Cursos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import MiCuenta from './pages/MiCuenta';
import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />

            <Route
              path="/mi-cuenta"
              element={
                <ProtectedRoute>
                  <MiCuenta />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;