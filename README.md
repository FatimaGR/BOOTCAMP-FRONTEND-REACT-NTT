<p align="center">
  <img src="src/assets/images/my-market-logo.png" width="50" height="50">
</p>
<h1 align="center">My Market</h1>
<p align="center">Una tienda amigable que crece contigo, asegurando una experiencia única en cada compra.</p>

<br>

## Progreso y Tecnologías
Entrega de la semana **Proyecto Integrador** del proyecto My Market, en la que se usaron las siguientes tecnologías:

![HTML5](https://img.shields.io/badge/HTML5-white?style=for-the-badge&logo=html5&logoColor=%23FFFFFF&color=%23E34F26)
![CSS3](https://img.shields.io/badge/CSS3-white?style=for-the-badge&logo=css3&color=%231572B6)
![Git](https://img.shields.io/badge/Git-white?style=for-the-badge&logo=git&logoColor=%23FFFFFF&color=%23F05032)
![Vite](https://img.shields.io/badge/Vite-%23242424?style=for-the-badge&logo=vite&logoColor=%23646CFF)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?style=for-the-badge&logo=typescript&logoColor=%23FFFFFF)
![React](https://img.shields.io/badge/-React-%23282C34?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React%20Router-%23282C34?style=for-the-badge&logo=reactrouter)
![Jest](https://img.shields.io/badge/Jest-%23F5F5F5?style=for-the-badge&logo=jest&logoColor=%23C21325)
![Testing Library](https://img.shields.io/badge/Testing%20library-%23302c42?style=for-the-badge&logo=testinglibrary)


## Instrucciones para ejecutar
1. Clonar este repositorio con el siguiente comando:
```
git clone https://github.com/FatimaGR/BOOTCAMP-FRONTEND-REACT-NTT.git
```
2. Dentro del proyecto, cambiar a la rama `feature/proyecto-integrador`:
```
git checkout feature/proyecto-integrador
```
3. **Nota importante:**
  Si revisaste previamente la versión del proyecto en JavaScript Vanilla (rama feature/javascript) o TypeScript Vanilla (rama feature/typescript) y tienes la carpeta node_modules, elimina esta carpeta antes de continuar. Esto asegurará que las dependencias correctas para la versión con React + TypeScript se instalen correctamente:

```
rm -rf node_modules
```

4. Instalar las dependencias con el siguiente comando:
```
npm install
```
5. Ejecutar el siguiente comando y abrir el proyecto en el navegador:
```
npm run dev
```

## Descripción general
![](readme-images/my-market-diseños-y-estilos.png)

### Funcionalidades implementadas
- [ ✓ ] Reutilización del proyecto My Market.
- [ ✓ ] Solución responsive.
- [ ✓ ] Creación de una pantalla Login integrando el servicio https://dummyjson.com/docs/auth#auth-login.
- [ ✓ ] La pantalla login valida correctamente cada campo del formulario mostrando un mensaje en la parte inferior de cada input en caso estén vacíos.
- [ ✓ ] Control de los errores generados por el servicio en caso la autenticación falle, se muestra un mensaje de error personalizado al usuario indicando que pasó.
- [  ] La pantalla login tiene la opción "Olvidé mi Contraseña", la cual abre un modal donde el usuario debe ingresar su correo. El modal valida el formato del correo y al presionar el botón muestra un mensaje de confirmación.
- [ ✓ ] Uso de react router dom para el manejo de las rutas.
- [ ✓ ] Creación de un HOC para permitir visualizar la página Home solo si el usuario ha iniciado sesión, caso contrario es redireccionado a la página Login.
- [ ✓ ] En la parte superior del menú se muestra el mensaje "Welcome: [NOMBRE DE USUARIO]" y este perdura durante la interacción con las pantallas Home y Order Summary.
- [ ✓ ] En el menú se encuentra la opción "Logout", la cual elimina los datos guardados en el local storage, limpia el contexto usado y redirecciona al login.
- [ ✓ ] Creación de un custom hook para el paginado del contenido.
- [  ] Todas las funcionalidades agregadas están testeadas.

### Arquitectura de carpetas
La estructura de carpetas se organizó de la siguiente manera:
- `src/` carpeta raíz del código fuente, contiene todo el código necesario para el proyecto, organizado en subcarpetas.
  - `assets/` contiene todos los recursos visuales y de diseño utilizados en la interfaz del proyecto.
  - `components/` contiene todos los componentes UI reutilizables de la aplicación.
  - `pages/` contiene las páginas principales de la aplicación.
  - `test-utils/` contiene mocks y wrappers para los tests.
  - `domain/` contiene las interfaces y acciones.
  - `enums/` contiene los enums.
  - `hoc/` contiene el HOC de autenticación.
  - `context/` contiene el código relacionado con la gestión de estados globales y su distribución en toda la aplicación, se encuentran tanto los contextos como los reducers.
  - `shared/`  contiene componentes que pueden ser utilizados en otros proyectos, diseñados para ser modulares y flexibles, como botones, formularios e inputs.
- `readme-images/` contiene las imágenes que se utilizan exclusivamente en el archivo README.md para documentar el progreso y los resultados visuales del proyecto.
- `main.tsx` incluye la estructura principal del proyecto.
- `package.json` incluye las dependencias y configuración del proyecto.
- `README.md` archivo de documentación que describe la estructura, funcionalidad y tecnologías empleadas en el proyecto.

## ¡Sigue el progreso de My Market! 🚀

✨ ¡Gracias por visitar el proyecto My Market! ✨

Este proyecto está en constante crecimiento, así que te invito a seguirlo para ver cómo evoluciona esta tienda amigable. 

Para obtener una descripción general completa, puedes visitar el README principal en la [rama main](https://github.com/FatimaGR/BOOTCAMP-FRONTEND-REACT-NTT/tree/main).

## Realizado por
Hola, soy Fátima, una desarrolladora Front-end Jr. emocionada por hacer que sus ideas cobren vida a través de proyectos que ayuden a las personas. Puedes conocer más sobre mi perfil y mis proyectos en:
- Website - [Fatima Gallardo](https://porfolio-website-gules.vercel.app)
- GitHub - [@FatimaGR](https://github.com/FatimaGR)