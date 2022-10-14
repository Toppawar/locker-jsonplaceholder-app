[![Pipeline](https://github.com/Toppawar/locker-jsonplaceholder-app/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Toppawar/locker-jsonplaceholder-app/actions/workflows/pipeline.yml)

# Demo

Demo desplegada con Vercel

[https://locker-jsonplaceholder-app.vercel.app/](https://locker-jsonplaceholder-app.vercel.app/)

# Resumen

Se ha realizado la creación de una SPA siguiendo el siguiente modelo.

Una plataforma donde poder visualizar uuna tabla de POSTS que incluye un buscador.
La tabla tiene la funcionalidad de filtrado por cabeceras excepto la opción de `Body`
Además, funciona con un página en cliente sin tener que cargar la lista completa.

Como extra en la tlaba se ha incluido el fetching de datos como estático el listado de usuarios por lo que la traba carga los POSTS y el nombre de los autores.

Al hacer click en una de las filas se realiza la redirección a una página detallada con:

- Título del post.
- El nombre del autor.
- El body del post

Cuando se pulse en el botón de `Editar` en la parte superior derecha, cargará un formulario que permitirá editar tanto el título como el body del post.

Si todo funciona bien, volvera al modo lectura y saldrá una notificación en verde que la actualización ha sido correcta.
En caso de fallo también se mostrará una notificación en rojo.

La página incluye el cambiar a modo noche si se desea.

## Tecnologías utilizadas

### Persistencia de datos

Para darle un poco más de esencia a la prueba, se ha implementado una tecnología de persistencia de datos. Solo se carga una vez por pantalla.

La persistencia de datos dura el tiempo que el cliente esté en la app mediante o a la hora. Dicha tecnología es  `SWR (1)`.


### Diseño

El diseño ha sido un poco imaginativo por mi parte. En cuanto a los componentes se han utilizado como base la libreria de `Chakra UI (2)`.

Además, se ha implementado la libreria de `react-icons (3)` para la iconografia (que además es compatible con la libreria de componentes).

Estas son las dependencias de mayor calibre en cuanto al proyecto. El resto son para la realización de Tests, animaciones/transiciones, la configuración de `eslint` y `webpack`.

## Scripts

En el proyecto se pueden ejecutar los siguientes scripts

### `npm run dev`

Ejecuta la app en modo desarrollo.<br />
Por defecto se abrirá automáticamente. El entorno se abre en [http://localhost:3000](http://localhost:3000) para verla en el navegador.

La página se actualiza cuando se realizan cambios en el entorno.<br />
También veras todos los errores que proporciona lint en la consola.

### `npm run test`

Ejecuta todos los test de forma interactiva en la consola.<br />

### `npm run build`

Construye la app para el entorno de producción generando una carpeta `build`.<br />
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

### `npm run start`

Ejectuta el proyecto generado por el build en un entorno de producción.

### `npm run lint`

Ejecuta el linter en la aplicación y en caso de encontrar errores puede:

1. Arreglarlos automaticamente.
2. En caso de requerir intervención, se mostrara un error en el log despues de ejecutar el linter.

### Github Actions

He creado un Action simple que instala las dependencias y ejecuta el linter antes de poder realizar un Merge tanto a `develop` como `master`.

### Referencias

1. [SWR - Stale While Revalidate](https://swr.vercel.app/es-ES)

2. [Chakra UI](https://chakra-ui.com/)

3. [React Icons](https://react-icons.github.io/react-icons/)

