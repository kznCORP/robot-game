"use client";

import React, { useState, useEffect } from "react";

/**
 * Bugs are:
 * - If the Grid is an even number, Toy Robot is not in the middle.
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
  const [toyRobotDirection, setToyRobotDirection] = useState("NORTH");
  const [rotationClass, setRotationClass] = useState(0);

  // Target Square
  const [targetSquarePosition, setTargetSquarePosition] = useState({
    row: 0,
    column: 0,
  });

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

  // Function to move the toy robot
  const moveToyRobot = () => {
    setToyRobotPosition((prevPosition) => {
      let { row, column } = prevPosition;
      // Edge condition, refactor here if toy robot moves out of bounds, end game.
      if (toyRobotDirection === "NORTH" && row > 0) row--;
      else if (toyRobotDirection === "EAST" && column < columns - 1) column++;
      else if (toyRobotDirection === "SOUTH" && row < rows - 1) row++;
      else if (toyRobotDirection === "WEST" && column > 0) column--;
      return { row, column };
    });
  };

  // Rotate the Toy Robot to the left
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

  // Rotate the Toy Robot to the right
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
        // If the toy robot has reached the target square, generate a new random position for the target square
        setTargetSquarePosition(generateRandomPosition());
      }
    }
  }, [toyRobotPosition, rows, columns, targetSquarePosition]);

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

      <div className="controls">
        <button onClick={rotateLeft}>Left</button>
        <button onClick={moveToyRobot}>Move</button>
        <button onClick={rotateRight}>Right</button>
      </div>
    </div>
  );
};

export default GameBoard;
