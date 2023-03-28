export const getNeighbors = (array, x, y, visited) => {
    const neighbors = [];
    const numRows = array.length;
    const numCols = array[0].length;

    // Check adjacent cells to the top, bottom, left, and right
    const offsets = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];

    for (let [dx, dy] of offsets) {
      const row = x + dx;
      const col = y + dy;
      // Skip if cell is out of bounds
      if (row < 0 || col < 0 || row >= numRows || col >= numCols) {
        continue;
      }
      if (visited.has(`${row}|${col}`)) {
        continue;
      }
      neighbors.push([row, col]);
    }
    return neighbors;
};

export const connectOs = (board, row1, col1, row2, col2) => {
    // Connect the cells horizontally
    if (row1 === row2) {
      const startCol = Math.min(col1, col2);
      const endCol = Math.max(col1, col2);
      for (let col = startCol + 1; col < endCol; col++) {
        board[row1][col] = "*";
      }
    }
    // Connect the cells vertically
    else {
      const startRow = Math.min(row1, row2);
      const endRow = Math.max(row1, row2);
      for (let row = startRow + 1; row < endRow; row++) {
        board[row][col1] = "*";
      }
    }
};

export const setupBoard = (rows, columns) => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        if (j % 2 || i % 2) {
          row.push(" ");
        } else {
          row.push("*");
        }
      }
      board.push(row);
    }
    return board;
  };
