# Tienda de Videojuegos - React

Una aplicación web moderna para diseñar portadas de videojuegos personalizadas, construida con React y Vite.

## 🚀 Características

- **Diseñador Interactivo**: Crea portadas personalizadas con un editor SVG interactivo
- **Autenticación**: Sistema de login con tokens JWT
- **Carrusel de Portadas**: Visualiza todas las portadas creadas en un formato elegante
- **Gestión de Portadas**: Edita, elimina y administra tus diseños
- **Responsive Design**: Funciona perfectamente en dispositivos móviles y desktop
- **Estilos Modernos**: UI limpia con colores morados y verde azulado

## 🛠️ Tecnologías

- **Frontend**: React 19, React Router DOM
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS personalizado con variables CSS
- **Backend**: Node.js + Express + MongoDB (proyecto original)

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 🔧 Configuración del Backend

Esta aplicación React está diseñada para trabajar con el backend Express existente. Asegúrate de que:

1. El servidor backend esté ejecutándose (normalmente en puerto 3000)
2. Las rutas de API estén configuradas correctamente:
   - `POST /api/usuarios/login` - Login de usuarios
   - `POST /api/usuarios/` - Registro de usuarios
   - `GET /api/camisetas` - Obtener portadas
   - `POST /api/camisetas` - Crear portada
   - `PUT /api/camisetas/:id` - Actualizar portada
   - `DELETE /api/camisetas/:id` - Eliminar portada

## 📱 Páginas y Componentes

### Páginas Principales
- **Login** (`/login`) - Autenticación de usuarios
- **Register** (`/register`) - Registro de nuevos usuarios
- **Home** (`/`) - Menú principal de navegación
- **Designer** (`/design`) - Editor de portadas interactivo
- **Carousel** (`/carousel`) - Galería de portadas
- **Results** (`/results`) - Estadísticas (próximamente)

### Componentes Principales
- **CoverDesigner**: Editor SVG interactivo
- **CoverTable**: Tabla de gestión de portadas
- **GameCarousel**: Carrusel de visualización
- **GameCard**: Tarjeta individual de portada
- **AuthContext**: Gestión de autenticación global

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
