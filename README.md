# Aplicación de Gestión de Autores

## Arquitectura de la Solución

Esta aplicación está construida con **Next.js 14** utilizando el App Router y **TypeScript** para el tipado estático. La arquitectura sigue un patrón de gestión de estado centralizado mediante **React Context API** que permite compartir el estado de los autores entre todos los componentes de la aplicación. La aplicación implementa un enfoque "combinado" donde los datos iniciales se cargan desde la API externa, pero todas las operaciones CRUD (crear, actualizar, eliminar, favoritos) se manejan localmente en memoria para mejorar la experiencia del usuario. Inicialmente, el CRUD hacia llamados a la API, pero por reglas de negocio de la API se mudo a esta implementación, la razón es que para eliminar un autor por ejemplo, este tienen dependencias con libros y simplemente daba error.

El proyecto está organizado con una separación clara de responsabilidades: componentes reutilizables en `/components`, lógica en `/lib` donde se definio el tipo de autor, se creo el custom hook de useAuthor donde se hace el llamado a la API pero tambien donde se definen las operaciones CRUD, tambien tenemos el authorsContext que es lo que nos permite proveer el contexto a los demas children,  y páginas en `/app` siguiendo la estructura del App Router de Next.js, aca nos encontramos con la page.tsx que redirige a authors/page.tsx, donde se listan los autores, tambien tenemos una pagina de error, durante el parcial se desarrollo la de favoritos/page.tsx que lista los autores marcados en fav. Tambien tenemos el create/page.tsx donde se renderiza el componente de form. Al igual que la de edit que reutiliza el form de autores. Los componentes que se crearon fueron: authorCard y authorForm, card para poder ver la lista de los autores y el form para poder crear autores, se reutilizo el componente de card para poder lista los autores favoritos. 

## Parte B - Pruebas Unitarias

### Opción desarrollada: Pruebas Unitarias con Jest y React Testing Library

Se implementaron pruebas unitarias completas para el componente AuthorForm que cubren:

- **Renderizado de formulario**: Verificación de que todos los campos (name, image, birthDate, description) se renderizan correctamente usando selectores semánticos.
- **Validación de envío**: Comprobación de que el formulario previene el envío con campos vacíos, mantiene el botón deshabilitado apropiadamente, y muestra mensajes de error correctos.

### Cómo validar las pruebas

<img width="711" height="258" alt="image" src="https://github.com/user-attachments/assets/978bbd52-8840-40ef-ab3d-c3e9af117f04" />

Para correr las pruebas como se ve en la imagen, simplemente hay que usar el comando de jest. En mi caso como yo use `bun` se ejecuta desde la raiz del proyecto.
```bash
  bun jest
```
O tambien se deberia poder con npx 
```bash
  npx jest
```
## Instrucciones para Ejecutar la Aplicación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/YairAndrade1/preparcial.git
   cd preparcial
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o si usas bun como lo hice yo
   bun install
   ```

3. **Ejecutar la aplicación en desarrollo**

   ```bash
   npm run dev
   # o si usas bun
   bun dev
   ```

4. **Abrir en el navegador**

   ```text
   http://localhost:3000
   ```


