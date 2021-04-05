#  Mi respuesta al juego del tutorial Tic Tac Toe de React Demo
[Tit Tac toe ](https://es.reactjs.org/tutorial/tutorial.html)

1. Muestra la ubicación para cada movimiento en el formato (columna, fila) en la lista del historial de movimientos.
2. Convierte en negrita el elemento actualmente seleccionado en la lista de movimientos.
3. Reescribe el Board para usar 2 ciclos para hacer los cuadrados en vez de escribirlos a mano.
4. Agrega un botón de switch que te permita ordenar los movimientos en orden ascendente o descendente.
5. Cuando alguien gana, resalta los 3 cuadrados que hicieron que gane.
6. Cuando nadie gana, muestra un mensaje acerca de que el resultado es un empate.

## Repositorio original
[kelanwu repo](https://github.com/kelanwu/react-tic-tac-toe.git)

## Muestra la ubicacion para cada movimiento
Usaremos el array de `squares` para guardar el estado de cada paso en la clase `Game`. Para esto modificamos el metodo `handleClick` para que guarde el ultimo estado de cada cuadro.


 ```javascript
handleClick(i){
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
```
Con `latestMoveSquare`, podemos facilmente contar la posicion de cada movimiento en le formato de (col, fila) y agregar esto a `desc`. Note que para este ejemplo usamos [plantillas literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals).

```javascript
 render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      //Mapping moves historial
      const moves = history.map((step, move) => {
        const latestMoveSquare = step.latestMoveSquare;
        const col = 1 + latestMoveSquare % 3;
        const row = 1 + Math.floor(latestMoveSquare / 3);
        const desc = move ? 
          `Go to move #${move} (${col}, ${row})`:
          'Go to start';
        return(
          <li key = {move}>
            <button 
            onClick={() => this.jumpTo(move)}>{desc}
            </button>
          </li>
        );
      });
```
Cuando se corre `npm start` deberias de poder ver la ubicacion de cada movimiento excepto en `Go to game start`.

## Reescribe el Board para usar 2 ciclos para hacer los cuadrados en vez de escribirlos a mano.
