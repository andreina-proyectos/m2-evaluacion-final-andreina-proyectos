![Adalab](_src/assets/images/logo-adalab-80px.png)
# Evaluación Andreina Romero García


## Plan de acción
1. Defino  la estructura de mi web
2. Recojo los elementos en mi JS
3. Defino mi primer listener: el del botón de search
4. Desarrollo mi función (la que se ejecuta al pinchar search)
5. Como se hace una búsqueda, desarrollo Fetch
6. La Data que obtengo, es un array compuesto por objetos, por lo tanto ya sé que data la desarrollo como data[i] porque es array
7. Elijo de mi api lo que me interesa, en este caso me interesa data[i].show.image
y data[i].show.name
8. De image elijo el tamaño medium
9. Sé que hay imágenes que son null, por lo tanto creo una condocional. Si la imagen es nula, pinto en mis resultados una imagen default, pero si tengo algo ahí dentro, pinto la imagen que cojo de la api
10. local storage: cojo el input.value y voy a meterlo en mi local storage con set item
11. nada más cargar la página, lo primero que quiero que haga mi navegador es coger esa info guardada en local storage con get item. Si contiene "algo", entonces cogelo, si no, no hagas nada.
12. La idea de todo esto, es que el usuario vea en su lista de favoritos una lista de imagen + titulo que yo cojo de mi local storage. Lo cojo con get item y lo pinto en mis resultados
13. Para eso, debería ponerle un add.eventListener a cada imagen, para que al ser click, se guarde en mis favoritos. Eso debería ser otro array? y luego lo recorro para escoger los elementos


## Espera, ¿esto se hace siempre?
> ### Solo una vez al principio en cada ordenador que utilicemos:
- Instalamos node
- Instalamos el comando de gulp de forma global para poder usarlo desde cualquier carpeta usando `npm install --global gulp-cli`

> ### Cada vez que descarguemos o clonemos un repo:
- `npm install` para instalar los paquetes necesarios para convertir Sass a CSS, minizarlo, etc.

> ### Cada vez que estemos trabajando con nuestro código:
- Desde nuestra terminal, ejecutamos el comando `gulp` para que realice la tarea por defecto, que en el caso del `gulpfile.js` que tenemos en adalab-web-starter-kit estará pendiente de nuestros archivos Sass, html y JavaScript y los compilará, minificará y/o recargará el servidor cada vez que hagamos un cambio

## Tareas de gulp incluidas
### Inicio de un web server para desarrollo
```
$ gulp
```
Lanza un webserver con BrowserSync y varios watchers estarán pendientes de los archivos SCSS/JS/HTML, en la carpeta **public/**, para recargar el navegador cuando se necesite.

### Versión lista para subir a producción
```
$ gulp docs
```
En la carpeta **docs/** genera los CSS y JS minimizados y sin sourcemaps listos para subir al repo y activar GitHub Pages en `master/docs`.


## Estructura del proyecto
Nuestro **gulpfile.js** usa un JSON de configuración con las rutas de los archivos a generar/vigilar.

La estructura de carpetas tiene esta pinta:
```
/
`- _src
   |- assets
   |  |- icons
   |  |- images
   |  |- js
   |  `- scss
   |     `- core
   |
   `- templates
      `- partials

```

## HTML
Viene incluído el paquete [**gulp-html-partial**](https://www.npmjs.com/package/gulp-html-partial) que nos va a permitir tener un sistema de plantillas html

## Imágenes e iconos
Tenemos en **_src/** una carpeta para las imágenes del proyecto y una para los iconos como el favicon o los iconos de dispositivos móviles. Estos últimos se generan en la raíz de las carpetas **public/** y **docs/**

## CSS
Viene incluído el paquete [**gulp-combine-mq**](https://www.npmjs.com/package/gulp-combine-mq) que agrupa todas las mediaqueries al final del documento css.

## JS
Podemos usar parciales de JS: en el JSON de configuración, **config.json** especificamos los archivos JS que utilizamos y en el orden que deben procesarse.

## ¿Cómo actualizo si tengo una versión anterior?
En principio puedes descargar todos los archivos fuera de **_src/** y sustituir los de tu proyecto. Además deberías replicar la estructura de carpetas dentro de **_src/**.

## Falta algo?
Echas de menos que el kit haga algo en concreto? Pidelo sin problema a través de los Issues o si te animas a mejorarlo mándanos un PR :)
