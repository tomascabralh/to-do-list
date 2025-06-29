# Ejercicio técnico frontend - Minder

## ¿Qué incluye este proyecto?

- **Frontend en React** usando Vite y TypeScript.
- **Componentes de Material-UI (MUI)** para toda la interfaz, incluyendo íconos de MUI en vez de emojis.
- **Gestión de tareas (To-Do List)** con las siguientes funcionalidades:
  - Crear, editar, listar y marcar tareas como pendientes o terminadas.
  - Cada tarea tiene: título, descripción, categoría, icono y color de icono.
  - Selección de icono y color para cada tarea, con visualización en grilla responsiva.
  - Formulario de tareas con tabs tipo "píldora" para elegir icono y color, y diseño responsivo (máx 396px, ancho completo en mobile).
  - Listado de tareas con diseño adaptado a mobile (flex direction, espaciado, fuentes).
  - Las tareas se agrupan en "Pendientes" y "Terminadas".
- **Consumo de API REST** (json-server) para persistencia de tareas y categorías.
- **Centralización de tipos TypeScript** en `src/types/index.ts` para mayor mantenibilidad.
- **Utilidades reutilizables** en `src/utils/` (handleSubmit, handleClose, splitTasks).
- **Contexto global** para el manejo del estado de tareas (`src/context/`).
- **Pruebas unitarias y de integración** con Jest y Testing Library:
  - Tests para ColorPicker, IconPicker, CategoryTag, TaskForm, TaskItem, TaskList, utilidades, hooks personalizados y servicios de API.
  - Cobertura de casos de UI, lógica y servicios.
- **Scripts útiles**:
  - `npm start`: ejecuta frontend y API juntos.
  - `npm run dev`: solo frontend.
  - `npm run db`: solo API.
  - `npm run test`: ejecuta todos los tests.
  - `npm run test:watch`: tests en modo interactivo.
- **Código organizado, limpio y consistente** siguiendo buenas prácticas de React y TypeScript.
- **README actualizado** con instrucciones claras para instalar, correr y testear el proyecto.

## ¿Cómo ejecutar?

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Iniciar la app y la API juntas:**

   ```bash
   npm start
   ```

   Esto ejecuta tanto el servidor de desarrollo de Vite como el servidor JSON para la API.

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - API: [http://localhost:3000](http://localhost:3000)

   **O bien, ejecutarlos por separado:**

   - Solo API: `npm run db`
   - Solo frontend: `npm run dev`

3. **Correr los tests:**
   ```bash
   npm run test
   ```
   - Para modo interactivo: `npm run test:watch`

---

## Consigna

A partir del código de este repositorio, crear una aplicación web (SPA) utlizando React que sirva para realizar un seguimiento de tareas pendientes (To-Do List).

### Formato de entrega

Se debe subir la solución a un repositorio de código a elección (puede ser GitHub, GitLab o Bitbucket entre otros) y enviar el link a dicho repositorio.

### Paquetes a utilizar

Es obligatorio el uso de MUI como biblioteca de componentes. El archivo `/package.json` ya tiene una serie de paquetes incluídos para facilitar el desarrollo. Se pueden agregar nuevos paquetes en el caso de considerarse necesario.

### Historias de usuario

Las siguientes historias de usuario definen los requerimientos de la aplicación:

- Las tareas tienen título, descripción, categoría y estado. El estado puede ser "Pendiente" o "Terminada".
- Como usuario quiero ver un listado de mis tareas pendientes y terminadas con el siguiente diseño: [diseño en Figma](https://www.figma.com/file/4Zwx6CXgKhV8yRGaIBnQK9/To-Do-List?type=design&node-id=0%3A1&mode=design&t=vOfS9v6wmkyCJvcF-1). Cada una de las tareas listadas muestra si está terminada o no, su título, descripción y categoría.
- Como usuario puedo marcar una tarea pendiente como tarea terminada haciendo click en el checkbox de la tarea. Luego de marcada como terminada, la tarea se lista bajo la sección de tareas terminadas.
- Como usuario puedo desmarcar una tarea terminada y volverla al estado pendiente haciendo click en el checkbox de la tarea. Luego de marcada como pendiente, la tarea se lista bajo la sección tareas pendientes.
- Como usuario abro el formulario "Nueva tarea" desde el botón "+" de la esquina inferior derecha (FAB).
- Como usuario puedo crear una nueva tarea completando el formulario "Nueva tarea" con los siguientes campos y luego haciendo click en el botón "Crear":
  - Título: obligatorio, máximo 40 caracteres.
  - Descripción: opcional, máximo 100 caracteres.
  - Categoría: obligatorio, dropdown con opciones obtenidas desde la API REST.
- Como usuario puedo cerrar el formulario "Nueva tarea" haciendo click en el botón "Cancelar" o haciendo click por fuera del formulario.
- Como usuario quiero que las tareas que creo y modifico queden guardadas en una base de datos. Para acceder a la base de datos se utilizará una API REST. Ver sección [Persistencia de datos](#persistencia-de-datos).

Puntos extras por:

- Como usuario puedo seleccionar un ícono para cada una de las tareas.
- Como usuario puedo seleccionar un color para el ícono de cada una de las tareas.
- Como usuario puedo editar una tarea haciendo clic sobre la misma y modificando sus datos en un formulario igual al de alta.

### Persistencia de datos

A fines de facilitar el desarrollo de la aplicación, se creó una API REST utilizando json-server a partir del archivo `/db.json`. Algunos de los endpoints que se pueden utilizar:

- `GET localhost:3000/tasks`
- `GET localhost:3000/tasks/{id}`
- `PUT localhost:3000/tasks/{id}`
- `POST localhost:3000/tasks`
- `GET localhost:3000/categories`

Para más información acerca de json-server, visitar [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server).

### Alcance

Queda fuera del alcance de este ejercicio el manejo de usuarios: la aplicación podrá ser utilizada por un único usuario y no necesitará loguearse.

## Posibles mejoras a implementar

- Agregar pruebas de integración/end-to-end (con Cypress o Playwright).
- Agregar validaciones de props más estrictas (Zod).
- Puedes agregar GitHub Actions para CI (lint + test en cada push).
- Automatizar el formateo con Prettier.

---
