const setupBoard = (rows, columns) => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        if (j % 2 || i % 2) {
          row.push(" ");
        } else {
          row.push("B");
        }
      }
      board.push(row);
    }
    return board;
};

const debugBoard = (board) => {
    for (let row of board) {
      console.log(row.join(" "))
    }
  };

debugBoard(setupBoard(10, 10));