"use client";

import React, { useState, useEffect } from "react";

/**
 * Bugs are:
 * - If the Grid is an even number, Toy Robot is not in the middle. [possible fix, grid has to be an odd number]
 *
 *
 * Most difficult Bug squished:
 * - Server and client data did not match, server expected random tsPosition to be one place, and client showed another.
 * - error msg: Prop `style` did not match. Server: expected "grid-row-start:3;grid-column-start:4" Client: "grid-row-start:4;grid-column-start:4"
 * [Fixed by using useEffect to generate a random position instead of initializating it in useState, did not know Next.js struggles with random data values in CSR/SSR.
 */

const GameBoard = ({ rows, columns }) => {
  // Toy Robot
  const [toyRobotPosition, setToyRobotPosition] = useState({
    row: Math.floor(rows / 2),
    column: Math.floor(columns / 2),
  });

  // Target Square
  const [targetSquarePosition, setTargetSquarePosition] = useState({
    row: 0,
    column: 0,
  });

  const [toyRobotDirection, setToyRobotDirection] = useState("NORTH");
  const [rotationClass, setRotationClass] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  // Create a dynamic grid, excluding 2 for Toy Robot and Target Square
  const gameBoard = [];
  for (let i = 0; i < rows * columns - 2; i++) {
    gameBoard.push(
      <div
        key={i}
        className="bg-gray-100 border border-gray-300 h-16 w-16 flex items-center justify-center"
      >
        <p className="text-gray-300">{i + 1}</p>
      </div>
    );
  }

  const moveToyRobot = () => {
    setToyRobotPosition((prevPosition) => {
      let { row, column } = prevPosition;

      if (toyRobotDirection === "NORTH") row--;
      else if (toyRobotDirection === "EAST") column++;
      else if (toyRobotDirection === "SOUTH") row++;
      else if (toyRobotDirection === "WEST") column--;

      // Edge condition, out of bounds.
      if (row < 0 || row >= rows || column < 0 || column >= columns) {
        setGameOver(true);
        setToyRobotDirection("NORTH");
        setRotationClass("rotate-0");
        return { row: Math.floor(rows / 2), column: Math.floor(columns / 2) };
      }

      return { row, column };
    });
  };

  const rotateLeft = () => {
    setToyRobotDirection((prevDirection) => {
      let newDirection;

      switch (prevDirection) {
        case "NORTH":
          setRotationClass("-rotate-90");
          newDirection = "WEST";
          break;
        case "WEST":
          setRotationClass("rotate-180");
          newDirection = "SOUTH";
          break;
        case "SOUTH":
          setRotationClass("rotate-90");
          newDirection = "EAST";
          break;
        case "EAST":
          setRotationClass("rotate-0");
          newDirection = "NORTH";
          break;
        default:
          newDirection = prevDirection;
      }

      return newDirection;
    });
  };

  const rotateRight = () => {
    setToyRobotDirection((prevDirection) => {
      let newDirection;

      switch (prevDirection) {
        case "NORTH":
          setRotationClass("rotate-90");
          newDirection = "EAST";
          break;
        case "EAST":
          setRotationClass("rotate-180");
          newDirection = "SOUTH";
          break;
        case "SOUTH":
          setRotationClass("-rotate-90");
          newDirection = "WEST";
          break;
        case "WEST":
          setRotationClass("rotate-0");
          newDirection = "NORTH";
          break;
        default:
          newDirection = prevDirection;
      }

      return newDirection;
    });
  };

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Generate a random position for the target square
      const generateRandomPosition = () => {
        const randomRow = Math.floor(Math.random() * rows);
        const randomColumn = Math.floor(Math.random() * columns);
        return { row: randomRow, column: randomColumn };
      };

      // Only generate a new position for the target square if it's the first render
      if (targetSquarePosition.row === 0 && targetSquarePosition.column === 0) {
        setTargetSquarePosition(generateRandomPosition());
      } else {
        // Check if the toy robot has reached the target square
        if (
          toyRobotPosition.row === targetSquarePosition.row &&
          toyRobotPosition.column === targetSquarePosition.column
        ) {
          // If the toy robot has reached the target square, +1 score and generate a new random position for the target square
          setScore((prevScore) => prevScore + 1);
          setTargetSquarePosition(generateRandomPosition());
        }
      }

      return () => clearTimeout(timer);
    } else if (gameOver) {
      setTimeLeft(60);
      setScore(0);
    } else if (timeLeft === 0) {
      setGameOver(true); // End game when time runs out
    }
  }, [
    toyRobotPosition,
    rows,
    columns,
    targetSquarePosition,
    timeLeft,
    gameOver,
  ]);

  return (
    <div>
      <div
        className="grid"
        style={{
          // Display Gameboard
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {gameBoard}

        {/* Toy Robot */}
        <div
          className={`bg-gray-700 w-full h-full flex items-center justify-center text-xl ${rotationClass}`}
          style={{
            // Display robot in the middle of the grid
            gridRowStart: toyRobotPosition.row + 1,
            gridColumnStart: toyRobotPosition.column + 1,
          }}
        >
          🤖⬆️
        </div>

        {/* Target Square */}
        <div
          className="bg-yellow-300 w-full h-full flex items-center justify-center text-2xl"
          style={{
            // Display random target square position.
            gridRowStart: targetSquarePosition.row + 1,
            gridColumnStart: targetSquarePosition.column + 1,
          }}
        >
          ⚙️
        </div>
      </div>

      <div>Score: {score}</div>
      <div>Time Left: {timeLeft} seconds</div>

      <div className="controls">
        <button onClick={rotateLeft}>Left</button>
        <button onClick={moveToyRobot}>Move</button>
        <button onClick={rotateRight}>Right</button>
      </div>
    </div>
  );
};

export default GameBoard;
