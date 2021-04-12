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

## Convierte en negrita el elemento actualmente seleccionado en la lista de movimientos.
Para este caso añadiremos este estilo al archivo `scr/index.css`

```css
.move-list-item-selected{
  float: left;
  font-weight: bold;
}
```
Modificando el metodo `render` en la clase `Game`, aplicamos el estilo de la clase `move-list-item-selected` si `move === this.state.stepNumber`, que quiere decir que el item a sido seleccionado.

Note el uso de `this` para que JS pueda asociar el parametro.

```Javascript
render() {
      //... nolhing changed
        return(
          <li key = {move}>
            <button className = {move === this.state.stepNumber ? 'move-list-item-selected':''}
            onClick={() => this.jumpTo(move)}>{desc}
            </button>
          </li>
        );
      });
```

## Reescribe el Board para usar 2 ciclos para hacer los cuadrados en vez de escribirlos a mano.
Para esta solucion vamos a reescribir el metodo render en `Board`, de esta manera usamos 2 ciclos `for` para generar la matriz de cuadros.
```Javascript
  //...
  render() {
      //using two loop to make the squares
      const boardSize = 3;
      let squares = [];
      for (let i =  0 ; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
          row.push(this.renderSquare(i*boardSize + j));
        }
        squares.push(<div>key={i} className="board-row"</div>);
      }

      return (
        <div>{squares}</div>
      );
    }
```

Para cada paso del primer ciclo, creamos una fila del tablero. Y para cada paso del segundo ciclo, añadimos un cuadro a la fila.

## Agrega un botón de switch que te permita ordenar los movimientos en orden ascendente o descendente.

Primero agregamos al estado del constructor la variable 'isAscending' como 'true' como sigue.
```Javascript
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext:true,
        isAscending:true,
      };
    }
```
Agregamos en el metodo `render` una condicion que esta ligada a la variable `isAscending`. De esta forma mandamos a llamar el metodo `.reverse`.
```Javascript
  const isAscending = this.state.isAscending;
      if (!isAscending) {
        moves.reverse();
      } 

```
Se agrega el boton en el render de `Game` llamando al metodo como se muetra a continuacion.
```Javascript
 return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick = {() => this.handleSortToggle()}>
              {isAscending ? 'Descending' : 'Ascending'}
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
```
Finalmente el metodo `handleSorting` se encarga de cambiar el estado de `isAscending`.
```Javascript
  handleSortToggle(){
      this.setState({
        isAscending: !this.state.isAscending
      });
    }
```