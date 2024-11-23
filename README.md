<p align="center">
  <img src="src/assets/images/my-market-logo.png" width="50" height="50">
</p>
<h1 align="center">My Market</h1>
<p align="center">Una tienda amigable que crece contigo, asegurando una experiencia única en cada compra.</p>

<br>

## Progreso y Tecnologías
Entrega de la semana **React Implementación** del proyecto My Market, en la que se usaron las siguientes tecnologías:

![HTML5](https://img.shields.io/badge/HTML5-white?style=for-the-badge&logo=html5&logoColor=%23FFFFFF&color=%23E34F26)
![CSS3](https://img.shields.io/badge/CSS3-white?style=for-the-badge&logo=css3&color=%231572B6)
![Git](https://img.shields.io/badge/Git-white?style=for-the-badge&logo=git&logoColor=%23FFFFFF&color=%23F05032)
![Vite](https://img.shields.io/badge/Vite-%23242424?style=for-the-badge&logo=vite&logoColor=%23646CFF)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?style=for-the-badge&logo=typescript&logoColor=%23FFFFFF)
![React](https://img.shields.io/badge/-React-%23282C34?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React%20Router-%23282C34?style=for-the-badge&logo=reactrouter)


## Instrucciones para ejecutar
1. Clonar este repositorio con el siguiente comando:
```
git clone https://github.com/FatimaGR/BOOTCAMP-FRONTEND-REACT-NTT.git
```
2. Dentro del proyecto, cambiar a la rama `feature/react-implementacion`:
```
git checkout feature/react-implementacion
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
- [ ✓ ] Creación de una página donde se visualizan la lista de productos del carrito, y un formulario para el envío de los productos.
- [ ✓ ] Creación de una tabla que muestra la lista de productos, con columnas para:
    - La imagen miniatura
    - Nombre del producto
    - Precio del product
    - Cantidad del producto con controles para aumentarla o disminuirla
    - Botón para eliminar el producto de la lista. 
  
  Asi mismo se muestra el monto total a pagar en la parte inferior de la tabla.
- [  ] Uso de react-router-dom para la gestión de rutas.
- [ ✓ ] Actualización del valor del contador, al modificar la cantidad y eliminar productos del carrito.
- [ ✓ ] Actualización de la lista de productos del carrito al eliminarlos.
- [ ✓ ] Actualización del monto total a pagar, al carmbiar la cantidad de productos.
- [ ✓ ] Uso de UseReducer, Context y Provider para el manejo de estados globales.
- [  ] Creación de un formulario con los campos: nombres, apellidos, distrito, dirección, referencia y celular.
- [  ] Validación de todos los campos del formulario, mostrando un mensaje que explique el error en cada campo.
- [  ] Uso de un custom hook para cargar el contenido del desplegable de distrito.
- [  ] Al presionar el botón de compra, si el formulario está vacío, se muestra un mensaje de error.
- [  ] Al presionar el botón de compra, si el formulario está completo, se muestra una alerta personalizada en la pantalla, y a nivel de consola se muestra una estructura de datos con los valores que ingresó el usuario.
- [  ] Al cerrar la alerta personalizada se limpian los datos del carrito, la tabla con la lista de productos, y se redirige a la página de inicio.

### Arquitectura de carpetas
La estructura de carpetas se organizó de la siguiente manera:
- `src/` carpeta raíz del código fuente, contiene todo el código necesario para el proyecto, organizado en subcarpetas.
  - `assets/` contiene todos los recursos visuales y de diseño utilizados en la interfaz del proyecto.
  - `components/` contiene todos los componentes UI reutilizables de la aplicación.
  - `pages/` contiene las páginas principales de la aplicación.
  - `services/` contiene todo el código relacionado con la lógica de la API.
  - `domain/` contiene las interfaces y acciones.
  - `context/` contiene el código relacionado con la gestión de estados globales y su distribución en toda la aplicación, se encuentran tanto los contextos como los reducers.
  - `shared/`  contiene componentes que pueden ser utilizados en otros proyectos, diseñados para ser modulares y flexibles, como botones, formularios e inputs.
  - `utils/` contiene funciones reutilizables.
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