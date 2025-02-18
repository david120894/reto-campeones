# README - Sistema de Reserva de Salas para el Centro de Convenciones Cusco

## Descripción

Este sistema es una landing page para el **Centro de Convenciones Cusco**, diseñada para que los usuarios puedan conocer los espacios disponibles para eventos, explorar sus características y realizar reservas a través de un formulario de contacto. La página cuenta con varias secciones interactivas, incluyendo una vista inicial, galería de salas, horarios, información sobre la entidad que brinda los servicios, beneficios de las salas, y una sección de contacto para consultas o solicitudes de reserva. La gestión de reservas se realiza a través de un backend en Laravel.

## Estructura de la página

1. **Navbar (Barra de Navegación)**:
   - Menú principal con enlaces a las secciones de la página: Servicios, Galería, Nosotros, Contactos.
   - Acceso a opciones de usuario como Login, Register, Dashboard.
   - Botón de "Reservar" para dirigir a la sección de contacto.

2. **Vista Principal (First View)**:
   - Imagen destacada del logo del Centro de Convenciones.
   - Título destacando el nombre del centro ("Centro de Convenciones Cusco").
   - Descripción breve de la propuesta de valor del centro.
   - Botones para navegar a la sección de horarios y la sección de reserva.

3. **Galería**:
   - Sección que muestra las distintas salas disponibles para eventos, con imágenes, descripciones, precios y botón de "Reservar".

4. **Servicios**:
   - Descripción de las salas y los servicios disponibles, con información sobre las tarifas para jornada completa y media jornada.

5. **Horarios**:
   - Información sobre los horarios disponibles para realizar reservas en las salas.

6. **Nosotros**:
   - Sección con información sobre la entidad que ofrece el servicio, destacando su misión, visión y valores.

7. **Formulario de Contacto**:
   - Los usuarios pueden enviar un correo electrónico a través de un formulario de contacto para hacer consultas o realizar solicitudes de reserva. El backend en Laravel se encarga de procesar y gestionar estos correos electrónicos.

## Tecnologías utilizadas

### Frontend:
- **HTML, CSS, SCSS**: Estructura y estilo de la página.
- **Tailwind CSS**: Framework de utilidades para el diseño responsivo y estilización rápida.
- **FontAwesome**: Para los íconos del menú y botones.
- **Angular 19**: Para la interacción dinámica en el frontend y navegación de la aplicación.

### Backend:
- **Laravel**: Framework PHP para gestionar las reservas de las salas, procesar formularios de contacto y enviar correos electrónicos de confirmación o consultas.
- **MySQL**: Base de datos para almacenar la información de las reservas y usuarios.

### Otras herramientas:
- **SVG**: Para los íconos gráficos y elementos visuales como las olas en la sección de servicios.

## Flujo del sistema

1. El usuario visita la landing page y navega por las diferentes secciones: servicios, galería, horarios, etc.
2. Al hacer clic en "Reservar" en cualquier sección, el usuario es dirigido a un formulario de contacto donde puede enviar una solicitud de reserva o consulta.
3. El formulario captura los detalles de la reserva (como sala, fecha y hora), y se envía al servidor Laravel para su procesamiento.
4. Laravel recibe la solicitud, guarda la información y envía un correo electrónico de confirmación al usuario.
5. El sistema administra las reservas y actualiza la disponibilidad de las salas en tiempo real.
```
┌───────────────────────────┐
│                           │
│  VISITAR LANDING PAGE     │
│  (Servicios, Galería, etc.) │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│   CLIC EN "RESERVAR"      │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│   FORMULARIO DE CONTACTO  │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│  INGRESAR DETALLES DE     │
│  RESERVA (Sala, Fecha...) │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│  ENVIAR FORMULARIO A      │
│  SERVIDOR LARAVEL         │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│  PROCESAR SOLICITUD EN    │
│  LARAVEL                  │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│  GUARDAR INFORMACIÓN EN   │
│  BASE DE DATOS            │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│  ENVIAR CORREO DE         │
│  CONFIRMACIÓN AL USUARIO  │
│                           │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│                           │
│  ACTUALIZAR DISPONIBILIDAD│
│  DE SALAS EN TIEMPO REAL  │
│                           │
└───────────┬───────────────┘
            │
            ▼
       ┌──────────┐
       │   FIN    │
       └──────────┘
```

## Instrucciones de uso

### Backend (Laravel):

1. Clona el repositorio del backend de Laravel y navega hasta la carpeta del proyecto.
2. Ejecuta `composer install` para instalar las dependencias de Laravel.
3. Configura las credenciales de la base de datos en `.env`.
4. Ejecuta `php artisan migrate` para crear las tablas necesarias en la base de datos.
5. Inicia el servidor de desarrollo con `php artisan serve`.

### Frontend (Angular):

1. Clona el repositorio del frontend y navega hasta la carpeta del proyecto.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `ng serve` para levantar el servidor de desarrollo.
4. Accede a la página en `http://localhost:4200`.

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin nueva-funcionalidad`).
5. Abre un pull request para que revisemos tu contribución.
