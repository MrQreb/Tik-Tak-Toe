# Gato react
## ¿Como ejecutar?
- Clonar el repositorio.
- Poner instalar paquetes npm ```npm install```.
- Ejecutar el servidor de react ```npm run dev ```.


## Juego gato

Sera el juego de gato clásico, que se jugará con click. Después de cada click se cambiara el turno del jugador mostrando en pantalla de quien es el turno, tendrá algunas sencillas animacione; como para mostrar el ganador y perdedor. 

Cada vez que el usuario se posicione en uno de los recuadros sabra en cual está posicionado.


## Tecnologías a utilizar  
El juego del gato estará programado Javascript. Utilizando un framework llamado **React**.

Este tendrá animaciones, como ganar, perder y entre otras.

Sera intuitivo sabiendo cual sera el turno del jugador, mostrándolo en pantalla.

## Estilos
Para la parte visual estaremos utilizando un framework de CSS llamado **Tailwind CSS** que consiste en pequeñas utilidades para personalizar los componentes de react. En algunas partes podrá utilizar **CSS** puro en caso de ser requerido. 

## Tailwind CSS
Es un framework CSS basado utility-first. Permite crear sitios webs sin salir del HTML.

### Ejemplo código Tailwind CSS
```HTML
<div class="space-y-4">
  <div class="w-96 bg-white shadow rounded">
      w-96
  </div>
```
[ Documentación Tailwind CSS ](https://tailwindcss.com/)

## Animaciones
Para las animaciones de dicho juego estaremos utilizando **animejs**, es una librería de js que nos permite con ciertos parámetros escritos escribir animaciones.

## Anime JS
Es una pequeña librería de js para animaciones. Utiliza CSS, DOM y Javascript. 

### Ejemplo de código
```javascript
anime({
  targets: '.css-selector-demo .el',
  translateX: 250
});
```
[ Documentación AnimeJS ](https://animejs.com/documentation/)

## Lógica
Para programar la lógica se utilizara **React** ya que nos permite añadir interactividad de manera dinámica. Esta basado en componentes que permiten ser reutilizados y personalizados.

## React
Es un framework open-source creado por Meta, que simplifica crear interfaces interactivas. Permitiendo realizar componentes reutilizables y personalizables. Permitiendo combinar código CSS, Javascript y HTML para la creación de los mismos.  

### Ejemplo de código
```javascript
function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}
```

[ Documentación React](https://react.dev/) 
