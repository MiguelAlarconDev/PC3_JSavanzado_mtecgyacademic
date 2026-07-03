# MTECGY Academic

Aplicación web desarrollada en React para la presentación, búsqueda y gestión visual de cursos, productos tecnológicos, ofertas académicas y servicios de orientación. El proyecto forma parte de la actividad **AP3 - JavaScript Avanzado** y aplica componentes reutilizables, React Router DOM, Hooks, consumo de datos con Fetch API, JSON Server, Tailwind CSS y despliegue web.

## Descripción del proyecto

**MTECGY Academic** es una plataforma académica y tecnológica orientada a estudiantes que desean consultar cursos, revisar productos relacionados con el aprendizaje digital, acceder a ofertas, gestionar un carrito de compras y comunicarse mediante un formulario de contacto.

La aplicación está organizada de forma modular para separar páginas, componentes, servicios, contextos y recursos visuales. Además, utiliza una base de datos simulada mediante `db.json`, la cual es consumida desde React a través de servicios creados con Fetch API.

## Objetivo

Desarrollar una aplicación web funcional y responsive utilizando React, aplicando los conocimientos del curso de JavaScript Avanzado en componentes, Hooks, rutas, formularios, consumo de servicios REST, Tailwind CSS, JSON Server, Git y GitHub.

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
- Git y GitHub
- Bootstrap
- Chart.js
- Oxlint

## Funcionalidades implementadas

- Página de inicio con presentación general de la plataforma.
- Página de cursos con carga dinámica desde JSON Server.
- Página de productos tecnológicos con búsqueda y filtrado por categoría.
- Página de ofertas con visualización dinámica.
- Página de tienda que integra productos, cursos y ofertas.
- Carrito de compras con agregar, aumentar, disminuir, eliminar y vaciar productos.
- Persistencia del carrito mediante `localStorage`.
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

## Estructura del proyecto

```txt
PC3_JSavanzado_mtecgyacademic/
├── db.json
├── package.json
├── README.md
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CourseCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   ├── OfferCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SectionTitle.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CarritoContext.jsx
│   ├── pages/
│   │   ├── Carrito.jsx
│   │   ├── Contacto.jsx
│   │   ├── Cursos.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MiCuenta.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Ofertas.jsx
│   │   ├── Productos.jsx
│   │   ├── Registro.jsx
│   │   └── Tienda.jsx
│   ├── services/
│   │   ├── contactService.js
│   │   └── productService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
└── public/
```

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/cursos` | Listado dinámico de cursos |
| `/productos` | Listado dinámico de productos tecnológicos |
| `/ofertas` | Ofertas académicas y tecnológicas |
| `/tienda` | Vista integrada de productos, cursos y ofertas |
| `/carrito` | Carrito de compras |
| `/nosotros` | Información general de la plataforma |
| `/contacto` | Formulario de contacto |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuario |
| `/mi-cuenta` | Vista protegida de cuenta del usuario |
| `/dashboard` | Panel administrativo protegido |
| `*` | Página 404 personalizada |

## Base de datos simulada

El proyecto utiliza JSON Server con el archivo `db.json`. Actualmente contiene los siguientes recursos:

| Recurso | Descripción |
|---|---|
| `productos` | Productos tecnológicos disponibles para la tienda |
| `cursos` | Cursos académicos disponibles |
| `ofertas` | Paquetes y promociones |
| `servicios` | Servicios mostrados en la página principal |
| `mensajes` | Mensajes enviados desde el formulario de contacto |

## Endpoints locales

Cuando JSON Server está activo, se pueden consultar los siguientes endpoints:

```txt
http://localhost:3000/productos
http://localhost:3000/cursos
http://localhost:3000/ofertas
http://localhost:3000/servicios
http://localhost:3000/mensajes
```

## Servicios implementados

La lógica de consumo REST se encuentra separada en la carpeta `src/services`.

### `productService.js`

Incluye funciones para:

- Obtener productos.
- Obtener un producto por ID.
- Obtener cursos.
- Obtener ofertas.
- Obtener servicios.
- Buscar productos.
- Filtrar productos por categoría.

### `contactService.js`

Incluye la función para enviar mensajes desde el formulario de contacto hacia el recurso `mensajes` de JSON Server.

## Uso de React

El proyecto aplica los principales recursos trabajados en el curso:

- Componentes funcionales.
- Props en tarjetas reutilizables.
- `useState` para formularios, filtros, menú móvil, carrito y autenticación.
- `useEffect` para consumo de datos y sincronización de estados.
- `map()` para renderizar listas de cursos, productos, ofertas y actividades.
- Renderizado condicional para mensajes, rutas protegidas, sesión activa y estados vacíos.
- Manejo de eventos en formularios, botones, carrito, login y navegación.
- Validaciones básicas en formularios.

## Credenciales de prueba

El inicio de sesión cuenta con usuarios demo para probar las rutas protegidas:

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@mtecgy.com` | `Admin123` |
| Usuario | `user@mtecgy.com` | `User1234` |

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd PC3_JSavanzado_mtecgyacademic
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar JSON Server

Abrir una primera terminal y ejecutar:

```bash
npm run server
```

El servidor REST quedará disponible en:

```txt
http://localhost:3000
```

### 4. Ejecutar React

Abrir una segunda terminal y ejecutar:

```bash
npm run dev
```

La aplicación se abrirá normalmente en:

```txt
http://localhost:5173
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Ejecuta el proyecto React en modo desarrollo |
| `npm run server` | Ejecuta JSON Server con el archivo `db.json` |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza la versión compilada |
| `npm run lint` | Ejecuta la revisión del código con Oxlint |

## Estado actual del proyecto

El proyecto ya cuenta con una base funcional avanzada:

- La aplicación compila correctamente.
- Las rutas principales están implementadas.
- JSON Server está configurado.
- Los datos se consumen desde servicios usando Fetch API.
- Existen componentes reutilizables.
- El carrito funciona con persistencia local.
- El formulario de contacto envía información hacia `db.json`.
- El login permite probar las rutas protegidas con usuarios demo.
- El diseño utiliza principalmente Tailwind CSS.

## Mejoras pendientes

Para fortalecer el proyecto antes de la entrega final, se recomienda trabajar en los siguientes puntos:

1. Integrar completamente el registro con el inicio de sesión para que los usuarios registrados puedan autenticarse.
2. Ajustar el Navbar para mejorar el ancho, centrado y comportamiento responsive.
3. Mejorar visualmente la página Mi Cuenta utilizando Tailwind CSS.
4. Reestructurar el Dashboard para reducir Bootstrap, ordenar el JSX y mejorar la presentación visual.
5. Revisar o limpiar archivos CSS antiguos que ya no se están utilizando directamente.
6. Confirmar el enlace del repositorio en GitHub.
7. Realizar el despliegue final de la aplicación.
8. Agregar al README el enlace del proyecto desplegado cuando esté disponible.

## Despliegue

El proyecto está preparado para generar una versión de producción mediante:

```bash
npm run build
```

El enlace del proyecto desplegado debe agregarse en esta sección cuando se publique en una plataforma como Netlify, Vercel o GitHub Pages.

```txt
Enlace del despliegue: pendiente
Repositorio GitHub: pendiente
```

## Presentación del proyecto

Para la sustentación, se puede explicar el proyecto siguiendo esta estructura:

1. Portada.
2. Integrantes del grupo.
3. Objetivo del proyecto.
4. Descripción de la temática desarrollada.
5. Tecnologías utilizadas.
6. Arquitectura del proyecto.
7. Componentes desarrollados.
8. Implementación de React: Hooks, Props, renderizado y eventos.
9. Consumo de servicios REST mediante Fetch API.
10. Uso de Tailwind CSS y diseño responsive.
11. Demostración del funcionamiento.
12. Repositorio y despliegue.
13. Conclusiones.

## Conclusión

MTECGY Academic es una aplicación web académica desarrollada con React que integra navegación por rutas, componentes reutilizables, consumo de datos desde JSON Server, formularios con validaciones, carrito de compras, autenticación básica y diseño responsive. El proyecto se encuentra en una etapa funcional avanzada y requiere principalmente ajustes finales de autenticación, diseño, limpieza de archivos y despliegue para quedar listo para la entrega.
