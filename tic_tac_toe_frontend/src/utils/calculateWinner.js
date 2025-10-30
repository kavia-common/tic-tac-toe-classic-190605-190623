export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /** Determine the winner of a 3x3 Tic Tac Toe board.
   * @param {Array<string|null>} squares - 9-length array with 'X', 'O', or null
   * @returns {'X'|'O'|null} Winner symbol or null if no winner yet
   */
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
