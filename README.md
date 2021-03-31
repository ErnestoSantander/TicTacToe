#  Mi respuesta al juego del tutorial Tic Tac Toe de React Demo
[Tit Tac toe ](https://es.reactjs.org/tutorial/tutorial.html)

1. Muestra la ubicación para cada movimiento en el formato (columna, fila) en la lista del historial de movimientos.
2. Convierte en negrita el elemento actualmente seleccionado en la lista de movimientos.
3. Reescribe el Board para usar 2 ciclos para hacer los cuadrados en vez de escribirlos a mano.
4. Agrega un botón de switch que te permita ordenar los movimientos en orden ascendente o descendente.
5. Cuando alguien gana, resalta los 3 cuadrados que hicieron que gane.
6. Cuando nadie gana, muestra un mensaje acerca de que el resultado es un empate.

## Repositorio original
`https://github.com/kelanwu/react-tic-tac-toe.git`

## Muestra la ubicacion para cada movimiento
Usaremos el array de `squares` para guardar el estado de cada paso en la clase `Game`. 

```handleClick(i){
      // ...
      this.setState({
        history:history.concat([
          {
          squares:squares,
          //Store the index of the latest moved square
          latestMoveSquare: i,
        }
      ]),
      // ...
      }
