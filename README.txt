Tienda virtual Condimentos Sander


Descripción del Proyecto:
Aplicación web full-stack desarrollada para la venta de condimentos artesanales. El sistema permite a los usuarios navegar por un catálogo de productos con múltiples presentaciones (empaques), gestionar un carrito de compras persistente y realizar el proceso de checkout con registro en base de datos relacional y generación de facturas.

Desarrollado cumpliendo con los lineamientos de la evidencia de desempeño de integración de módulos componentes.


Tecnologías Utilizadas

Frontend
React.js (v18): Interfaz de usuario declarativa y componentes reutilizables.
Vite: Herramienta de construcción rápida y servidor de desarrollo.
React Router DOM: Manejo de rutas y navegación protegida.
CSS3: Estilización personalizada y diseño responsive.
Context API: Gestión de estado global (Carrito de compras).

Backend
Node.js: Entorno de ejecución.
Express.js: Framework para creación de API RESTful.
Bcrypt.js: Encriptación segura de contraseñas.
CORS: Middleware para seguridad de dominios cruzados.

Base de Datos
MySQL 8.0: Sistema de gestión de bases de datos relacional.
MySQL2: Driver de conexión con soporte para Promesas.


Guía de Instalación y Configuración
1. Clonar o Descargar el Repositorio
link: 

2. Configuración de la Base de Datos
Abre MySQL Workbench
Ejecuta el script de creación ubicado en la carpeta database

3. Configuración del Backend
Navega a la carpeta del servidor:
cd auth-api
Instala las dependencias:
npm install
Verifica las credenciales en config/db.js 

4. Configuración del Frontend
accede al frontend
cd tienda-sander-front
Instala las dependencias:
npm install


Ejecución del Proyecto
Mantener dos terminales abiertas una con el backend y otra con el frontend

Terminal 1 (Backend):
cd auth-api
npm start
El servidor iniciará en http://localhost:3000


Terminal 2 (Frontend):
cd tienda-sander-front
npm run dev
La aplicación estará disponible en http://localhost:5173


Credenciales de Prueba
registrate en la pagina para crear un usuario nuevo


Funcionalidades Principales
Autenticación: Registro e inicio de sesión seguro con encriptación de contraseñas.
Catálogo Dinámico: Productos con precios que cambian según la presentación (Copa, Libra, Galón).
Carrito de Compras: Persistencia de datos en localStorage y estado global.
Checkout: Proceso de compra que guarda el pedido en MySQL y genera una factura detallada.
Seguridad: Rutas protegidas, validación de inputs y limpieza de sesión al cerrar.


Licencia
Proyecto desarrollado con fines educativos para la evidencia de certificación SENA.

