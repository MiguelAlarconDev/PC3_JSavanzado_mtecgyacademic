# MTECGY Academic

Aplicación web desarrollada en React para la presentación, búsqueda y gestión de cursos, productos tecnológicos, ofertas académicas y servicios de orientación. El proyecto corresponde a la actividad **AP3 - JavaScript Avanzado** y aplica componentes reutilizables, React Router DOM, Hooks, consumo de datos con Fetch API, JSON Server, Tailwind CSS, Git y GitHub.

## Descripción del proyecto

**MTECGY Academic** es una plataforma académica y tecnológica orientada a estudiantes que desean consultar cursos, revisar productos relacionados con el aprendizaje digital, acceder a ofertas, gestionar un carrito de compras y comunicarse mediante un formulario de contacto.

La aplicación está organizada de forma modular para separar páginas, componentes, servicios, contextos y recursos visuales. Además, utiliza una base de datos simulada mediante `db.json`, la cual es consumida desde React a través de servicios creados con Fetch API.

## Objetivo

Desarrollar una aplicación web funcional, dinámica y responsive utilizando React, aplicando los conocimientos del curso de JavaScript Avanzado en componentes, Hooks, rutas, formularios, consumo de servicios REST, Tailwind CSS, JSON Server, Git y GitHub.

## Tecnologías utilizadas

- React
- React Router DOM
- JavaScript ES6+
- HTML5
- CSS3
- Tailwind CSS
- JSON Server
- Fetch API
- Vite
- Chart.js
- Oxlint
- Git y GitHub

## Funcionalidades implementadas

- Página de inicio con presentación general de la plataforma.
- Página de información institucional mediante la sección Nosotros.
- Página de cursos con carga dinámica desde JSON Server.
- Página de productos tecnológicos con búsqueda y filtrado por categoría.
- Página de ofertas con visualización dinámica.
- Página de tienda que integra productos, cursos y ofertas.
- Carrito de compras con opción de agregar, aumentar, disminuir, eliminar y vaciar productos.
- Contador del carrito actualizado automáticamente desde el Navbar.
- Persistencia del carrito mediante `localStorage`.
- Sincronización del carrito mediante contexto global, servicio independiente y evento personalizado.
- Mensaje flotante de producto agregado al carrito.
- Formulario de contacto funcional con validaciones básicas.
- Envío de mensajes de contacto mediante Fetch API hacia JSON Server.
- Registro de usuarios con validaciones básicas y almacenamiento local.
- Inicio de sesión con credenciales demo.
- Rutas protegidas para Mi Cuenta y Dashboard.
- Dashboard administrativo con métricas, gráficos y actividad reciente.
- Página Mi Cuenta para visualizar información del usuario autenticado.
- Página 404 personalizada para rutas inexistentes.
- Navbar reutilizable con navegación responsive.
- Footer reutilizable.
- Componentes reutilizables para tarjetas, secciones, productos, cursos y ofertas.

## Trabajo realizado en la última actualización

Desde el último commit trabajado, se realizaron las siguientes mejoras y correcciones:

### Corrección del carrito de compras

Se reforzó la lógica del carrito porque el contador del Navbar no se actualizaba automáticamente al agregar productos.

Cambios aplicados:

- Se agregó el archivo `src/services/carritoService.js`.
- Se centralizó la lógica del carrito en un servicio independiente.
- Se mejoró `CarritoContext.jsx` para manejar el estado global del carrito.
- Se sincronizó el carrito con `localStorage`.
- Se agregó un evento personalizado para notificar cambios del carrito.
- Se actualizó `Navbar.jsx` para escuchar los cambios del carrito y actualizar el contador automáticamente.
- Se mantuvo visible el contador del carrito en la barra de navegación.
- Se agregó mensaje flotante al agregar productos.
- Se verificó que al agregar productos el contador cambie correctamente, por ejemplo: `Carrito (0)` a `Carrito (1)`.

### Actualización de páginas relacionadas

Se revisaron y ajustaron las páginas donde se agregan productos al carrito:

- `src/pages/Productos.jsx`
- `src/pages/Tienda.jsx`

Estas páginas ahora llaman correctamente a la función global del carrito desde el contexto.

### Limpieza y revisión general

También se revisó la estructura del proyecto para confirmar que se mantenga organizada por:

- `components`
- `pages`
- `services`
- `context`
- `assets`

Además, se revisó que el proyecto conserve el uso de React Router DOM, Hooks, Fetch API, JSON Server y Tailwind CSS.

## Estructura del proyecto

```txt
PC3_JSavanzado_mtecgyacademic/
├── db.json
├── package.json
├── README.md
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── index.html
├── public/
└── src/
    ├── assets/
    ├── components/
    │   ├── CourseCard.jsx
    │   ├── Footer.jsx
    │   ├── Navbar.jsx
    │   ├── NotFound.jsx
    │   ├── OfferCard.jsx
    │   ├── ProductCard.jsx
    │   ├── ProtectedRoute.jsx
    │   └── SectionTitle.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   └── CarritoContext.jsx
    ├── pages/
    │   ├── Carrito.jsx
    │   ├── Contacto.jsx
    │   ├── Cursos.jsx
    │   ├── Dashboard.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── MiCuenta.jsx
    │   ├── Nosotros.jsx
    │   ├── Ofertas.jsx
    │   ├── Productos.jsx
    │   ├── Registro.jsx
    │   └── Tienda.jsx
    ├── services/
    │   ├── carritoService.js
    │   ├── contactService.js
    │   └── productService.js
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx