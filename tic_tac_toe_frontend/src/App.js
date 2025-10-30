import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import './styles.css';
import { calculateWinner } from './utils/calculateWinner';

/**
 * Square button component for a Tic Tac Toe board cell.
 */
function Square({ value, onClick, disabled, index }) {
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Square ${index + 1}${value ? `, ${value}` : ''}`}
    >
      {value}
    </button>
  );
}

/**
 * Board component renders a 3x3 grid of Square components.
 */
function Board({ squares, onSquareClick, isLocked }) {
  return (
    <div className="ttt-grid" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((sq, i) => (
        <Square
          key={i}
          index={i}
          value={sq}
          onClick={() => onSquareClick(i)}
          disabled={Boolean(sq) || isLocked}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Game state:
   * - squares: 9-length array storing 'X' | 'O' | null
   * - xIsNext: boolean indicating whose turn it is
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Compute winner and draw state
  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every(Boolean), [squares]);
  const isDraw = !winner && isBoardFull;

  const gameOver = Boolean(winner) || isDraw;

  // PUBLIC_INTERFACE
  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, isDraw, xIsNext]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    if (squares[index] || gameOver) return; // ignore invalid or locked moves
    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="app-root" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <main className="container">
        <h1 className="title" aria-live="polite">Tic Tac Toe</h1>

        <div
          className={`status ${winner ? 'status-win' : isDraw ? 'status-draw' : ''}`}
          role="status"
          aria-live="polite"
        >
          {statusText}
        </div>

        <Board squares={squares} onSquareClick={handleSquareClick} isLocked={gameOver} />

        <div className="actions">
          <button
            className="btn"
            onClick={resetGame}
            aria-label="Restart game"
          >
            Restart
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {gameOver ? 'Game over' : 'Game in progress'}
        </p>
      </main>
    </div>
  );
}

export default App;
