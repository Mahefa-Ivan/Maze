import React, { useRef, useEffect, useCallback } from "react";
import "./canvas.css";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const drawMaze = useCallback(() => {
    const board = props.board || [];

    if (!board || board.length <= 0) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 500;
    const stepx = canvas.width / board.length;
    const stepy = canvas.height / board[0].length;

    let x = 0;
    let y = 0;

    for (let i = 0; i < board.length; i++) {
      y = 0;
      for (let j = 0; j < board[0].length; j++) {
        context.fillStyle = board[i][j] === " " ? "#121212" : "#FFF";
        if (board[i][j] === "S") {
          context.fillStyle = "#ff0000";
        }
        context.fillRect(x, y, stepx, stepy);
        y += stepy;
      }
      x += stepx;
    }
  }, [props.board]);

  useEffect(() => {
    drawMaze();
  }, [drawMaze]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
