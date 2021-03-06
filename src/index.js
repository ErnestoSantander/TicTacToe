import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';

//Componente de funcion Square que solo renderiza 
function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return (
      <Square
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
            />
          );
    }
    render() {
      //using two loop to make the squares
      const boardSize = 3;
      let squares = [];
      for (let i =  0 ; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
          row.push(this.renderSquare(i*boardSize + j));
        }
        squares.push(<div key={i} className="board-row">{row}</div>);
      }

      return (
        <div>{squares}</div>
      );
    }
  }
  
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

    handleClick(i){
      //new conts added
      const history = this.state.history.slice(0, this.state.stepNumber + 1); //modified to use jumpTo 
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O' ;
      this.setState({
        history:history.concat([
          {
          squares:squares,
          //Store the index of the latest moved square
          latestMoveSquare: i,
        }
      ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext:(step % 2) === 0,
      });
    }

    //Method for handling sorting list
    handleSortToggle(){
      this.setState({
        isAscending: !this.state.isAscending
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const stepNumber = this.state.stepNumber;

      //Mapping moves historial
      let moves = history.map((step, move) => {
        const latestMoveSquare = step.latestMoveSquare;
        const col = 1 + latestMoveSquare % 3;
        const row = 1 + Math.floor(latestMoveSquare / 3);
        const desc = move ? 
          `Go to move #${move} (${col}, ${row})`:
          'Go to start';
        return(
          <li key = {move}>
            <button className = {move === stepNumber ? 'move-list-item-selected' : ''}
            onClick={() => this.jumpTo(move)}>{desc}
            </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: '+ winner;
      } else {
        status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O' );
      }

      const isAscending = this.state.isAscending;
      if (!isAscending) {
        moves.reverse();
      } 
      

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
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }