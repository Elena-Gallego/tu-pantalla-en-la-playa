#README
# Tu pantalla en la playa

Enunciado:

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV que nos permite
marcar y desmarcar las series como favoritas y guardarlas en local storage.
El ejercicio también tiene una parte de maquetación con HTML y Sass.
Vamos de definir los distintos hitos de los que ha constado el ejercicio:

1. Estructura básica

   En primer lugar, realizar una estructura básica sobre este modelo. 

   La aplicación de búsqueda de series debe consta de dos partes:

   1. Un campo de texto y un botón para buscar series por su título.
   2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

2. Búsqueda

   Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TVMaze para
   búsqueda de series. Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo
   de búsqueda.
   
   Por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos
   una imagen de la serie y el título, se trata de la lista de series favoritas.
   Algunas de las series que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen
   de relleno. 

   Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML o
   manipulando de forma avanzada el DOM.

3. Favoritos

   - Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series favoritas.

   Para ello, al hacer clic sobre una serie debe pasar lo siguiente:

   - El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
   - Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con
     las series favoritas. 
   - Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

4. Almacenamiento local.

   Almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de
   favoritos se debe mostrarse.

5. BONUS: Borrar favoritos

   Como bonus, os proponemos la opción de borrar favoritos. Al hacer clic sobre el icono de una 'x' al lado de
   cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.
   Para terminar de rematar nuestra app de series, nos gustaría poder añadir/quitar como favorito al hacer clic
   sobre una serie del lado de la derecha. Y que, si realizamos una nueva búsqueda y sale una serie que ya es
   favorita, aparezca ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).
   Y ya sería fantástico si al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.
   

6. BONUS: Afinar la maquetación

   Una vez terminada la parte de interacción, podemos centrarnos en la parte de maquetación donde decidir los estilos. 
   

7. Tecnologías aplicadas en este ejercicio:

- General:
  Usar una estructura adecuada de ficheros y carpetas para un proyecto web, y enlazar bien los distintos
  ficheros*.
  Tener el código perfectamente indentado*.
  Uso de control de versiones con ramas para manejar un proyecto de código.

- JavaScript:
  Crear código JavaScript con sintaxis correcta y bien estructurado*.
  Usar constantes / variables para almacenar información y re-asignar valores*.
  Usar condicionales para ejecutar acciones distintas en función de una condición*.
  Saber trabajar con listados de datos (arrays).
  Usar funciones para estructurar el código.
  Saber modificar la información del DOM para añadir contenido dinámico*.
  Saber escuchar eventos del DOM y actuar en consecuencia.

-Peticiones AJAX y APIs
   Crear peticiones con fetch y promesas.
   Saber trabajar correctamente con la respuesta del servidor*.
   Gestionar información en formato JSON.
   Usar el localStorage para guardar información en el navegador.

