# API de Gestión de Envíos

API REST construida con Node.js, Express y TypeScript para la gestión de órdenes de envío y clientes. Incluye gestión de pedidos, gestión de clientes, autenticación de usuarios y caché Redis para un rendimiento optimizado.

## Características

- 🚚 Gestión completa de órdenes de envío
- 👥 Sistema de gestión de clientes
- 🔐 Autenticación y autorización de usuarios
- 📦 Soporte para TypeScript
- 💾 Integración con MySQL
- ⚡ Caché Redis para mejor rendimiento
-  🐋 Aplicacion Dockerizada

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- Redis
- Docker
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/redmoart23/shipment-management-api.git
cd shipment-management-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Luego edita el archivo `.env` con tu configuración:
```
# Servidor
PORT=3000

# Base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=shipping_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=24h

# GOOGLE MAPS
GOOGLE_MAPS_API_KEY=tu_api-google_maps
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Iniciar el servidor de desarrollo
```bash
docker-compose up -d --build
```


## Endpoints de la API

#### Visistar **https://localhost:3000/docs**

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión y obtener token

### Clientes
- `GET /api/v1/clients` - Obtener todos los clientes
- `GET /api/v1/clients/:id` - Obtener cliente por ID
- `POST /api/v1/clients` - Crear nuevo cliente

### Órdenes
- `GET /api/v1/orders` - Obtener todas las órdenes
- `GET /api/v1/orders/:id` - Obtener orden por ID
- `POST /api/v1/orders` - Crear nueva orden
- `PUT /api/v1/orders/:id` - Actualizar estado de la orden

## Tecnologías

- **[Node.js](https://nodejs.org/)** - Entorno de ejecución
- **[Express.js](https://expressjs.com/)** - Framework web
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación
- **[MySQL2](https://github.com/sidorares/node-mysql2)** - Cliente MySQL para Node.js
- **[Redis](https://redis.io/)** - Almacenamiento en memoria para caché
- **[Docker](https://redis.io/)** - Contenedor con la aplicacion
- **[JSON Web Token](https://jwt.io/)** - Mecanismo de autenticación

## Estructura del Proyecto

```
src/
├── config/         # Archivos de configuración
├── controllers/    # Manejadores de peticiones
├── database/       # configuracion de bases de datos
├── helpers/        # funciones para validacion
├── middleware/     # Middleware personalizado
├── models/         # Modelos de base de datos
├── routes/         # Definición de rutas
├── interfaces/     # Definiciones de tipos TypeScript
└── utils/          # Funciones utilitarias
```

## Scripts

- `npm run dev` - Iniciar servidor de desarrollo con recarga en caliente
- `npm run build` - Construir para producción
- `npm start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint
- `npm test` - Ejecutar pruebas

## Estrategia de Caché

La API implementa caché Redis para datos frecuentemente accedidos:

- El caché se invalida automáticamente cuando los datos relacionados son modificados.

## Cómo Contribuir

1. Hacer fork del repositorio
2. Crear tu rama de características: `git checkout -b feature/mi-nueva-caracteristica`
3. Hacer commit de tus cambios: `git commit -am 'Agregar alguna característica'`
4. Push a la rama: `git push origin feature/mi-nueva-caracteristica`
5. Enviar un pull request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.