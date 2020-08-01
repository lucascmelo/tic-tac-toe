import React, {useState} from 'react';
import './App.css';

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <button key={i} className={square} onClick={() => onClick(i)}>{square}</button>
      ))}
    </div>
  )
}

const Math = (player, history) => {
  const comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < comb.length; i++) {
    const [a, b, c] = comb[i];
    if(history[a] === player && history[b] === player && history[c] === player) {
      return player;
    }
    
    return null;
  }
}

function App() {
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState('x');
  const [history, setHistory] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    if(history[i] != null || winner != null) {
      return false;
    }

    history[i] = player;
    const p = (player==='x') ? 'o' : 'x';
    setHistory(history);
    setPlayer(p);
    setWinner(Math(player, history));
  };

  const handleRestart = () => {
    setHistory(Array(9).fill(null));
    setPlayer('x');
    setWinner(null);
  }

  return (
    <>
      <h1>React Tic Tac Toe</h1>
      <div className="info-wrapper">
        <h2>{winner ? "Winner: " + winner : "Next Player: " + player}</h2>
        <button onClick={handleRestart}>Restart Game</button>
      </div>
      <Board squares={history} onClick={handleClick} />
    </>
  );
}



export default App;
