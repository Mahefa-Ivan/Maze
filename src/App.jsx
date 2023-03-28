import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/drawing/canvas/canvas";
import getRandomInteger from "./utils/random";
import { getNeighbors, connectOs, setupBoard } from "./utils/neighbors";

function App() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    console.log("rendered");
  }, []);

  const printBoard = (board) => {
    for (let row of board) {
      console.log(row.join(" "));
    }
  };

  const makeMaze = (board) => {
    /*TODO: refactor everything*/

    let x_position = 0; /* getRandomInteger(0, board.length - 1); */
    let y_position = 0; /* getRandomInteger(0, board[0].length - 1); */

    let unvisited_neighbors = [];

    const visited_cells = new Set();
    const unvisited_cells = new Set();

    unvisited_cells.add(`${x_position}|${y_position}`);
    let first = true;

    //while there are still some unvisited cells
    while (unvisited_cells.size) {
      // set the current cell as visited
      if (first) {
        board[x_position][y_position] = "S";
        first = !first;
      } else {
        board[x_position][y_position] = "*";
      }

      visited_cells.add(`${x_position}|${y_position}`);
      unvisited_cells.delete(`${x_position}|${y_position}`);

      //pick some random neighbor that are yet to be visited
      const neighbors = getNeighbors(
        board,
        x_position,
        y_position,
        visited_cells
      );

      for (let neighbor of neighbors) {
        unvisited_cells.add(`${neighbor[0]}|${neighbor[1]}`);
      }

      if (neighbors && neighbors.length > 0) {
        unvisited_neighbors.push([x_position, y_position]);
      }

      if (!neighbors || neighbors.length === 0) {
        const [x, y] = unvisited_neighbors.pop();
        x_position = x;
        y_position = y;
        continue;
      }

      let index = getRandomInteger(0, neighbors.length - 1);

      connectOs(
        board,
        x_position,
        y_position,
        neighbors[index][0],
        neighbors[index][1]
      );

      visited_cells.add(`${neighbors[index][0]}|${neighbors[index][1]}`);

      x_position = neighbors[index][0];
      y_position = neighbors[index][1];
    }
    printBoard(board);
    return board;
  };

  return (
    <div className="container">
      <Canvas board={board} />
      <button
        onClick={() => {
          const new_board = makeMaze(setupBoard(29, 15));
          setBoard(new_board);
        }}
      >
        Generate
      </button>
    </div>
  );
}

export default App;
