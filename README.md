```markdown
# 🌱 AgroVet - Sistema de Gestión Agrícola y Veterinaria

Sistema web desarrollado en Node.js para la gestión de inventario, clientes, empleados y categorías de un centro agrícola y veterinario. Incluye autenticación de usuarios y un diseño moderno y responsivo.

## 📋 Características

- **Autenticación de Usuarios:** Sistema de login seguro para administradores.
- **Gestión de Productos:** CRUD completo (Crear, Leer, Actualizar, Eliminar) con detalles de stock y vencimiento.
- **Gestión de Clientes y Empleados:** Administración de datos personales y roles.
- **Categorización:** Organización de productos por categorías.
- **Base de Datos Robusta:** Estructura relacional en SQL Server con esquemas definidos.
- **Interfaz Moderna:** Diseño limpio y minimalista usando CSS puro optimizado.

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** Microsoft SQL Server (MSSQL)
- **Motor de Plantillas:** EJS
- **Estilos:** CSS3 (Custom Styles)
- **Autenticación:** express-session

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### 1. Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado [SQL Server](https://www.microsoft.com/es-es/sql-server/sql-server-downloads) y SQL Server Management Studio (SSMS).
- Git (opcional, para clonar el repositorio).

### 2. Clonar el Repositorio
```bash
git clone https://github.com/corion200/BDD-Proyecto.git
cd BDD-Proyecto
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Configurar la Base de Datos
1. Abre **SSMS** y conéctate a tu instancia local.
2. Abre el archivo `script.sql` (o copia el script provisto) y ejecútalo para crear la base de datos y las tablas.
3. Ve al archivo `conexion.js` en la raíz del proyecto y configura tus credenciales locales:

```javascript
const config = {
    user: 'tu_usuario_sql',     // Ej: 'sa' o un usuario creado por ti
    password: 'tu_contraseña',
    server: 'localhost',        // O el nombre de tu servidor
    database: 'Centro_Agricola_Veterinario',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
```

### 5. Ejecutar el Servidor
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:3000`.

## 🚀 Uso

1. Abre tu navegador y ve a `http://localhost:3000`.
2. Serás redirigido a la página de **Login**.
3. Usa las credenciales por defecto (insertadas en el script SQL):
   - **Correo:** `agroservicio@gmail.com`
   - **Contraseña:** `VacaFeliz123`
4. Una vez dentro, podrás navegar por el panel de administración para gestionar productos, clientes, etc.

## 📂 Estructura del Proyecto

```text
DB-Proyecto/
├── controllers/        # Lógica de negocio y consultas a la BD
├── routes/             # Definición de rutas y endpoints
├── views/              # Plantillas EJS (Frontend)
│   ├── partials/       # Componentes reutilizables (Header, Footer)
│   ├── auth/           # Vistas de login
│   ├── productos/      # Vistas de productos
│   └── ...             # Otras vistas
├── public/             # Archivos estáticos (CSS, JS cliente)
├── conexion.js         # Configuración de conexión a SQL Server
├── app.js              # Archivo principal de la aplicación
└── README.md           # Este archivo
```

## 📄 Licencia
Este proyecto fue creado con fines educativos para el curso de Base de Datos.
```

¡Con esto tu repositorio tendrá una documentación profesional!
