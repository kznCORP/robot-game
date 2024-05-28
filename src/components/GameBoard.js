"use client";

/**
 * Bugs are:
 * - If the Grid is an even number, Toy Robot is not in the middle. [possible fix, grid has to be an odd number]
 *
 */

import React, { useState, useEffect } from "react";

const GameBoard = ({ rows, columns }) => {
  const [user, setUser] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const [toyRobotPosition, setToyRobotPosition] = useState({
    row: Math.floor(rows / 2),
    column: Math.floor(columns / 2),
  });
  const [targetSquarePosition, setTargetSquarePosition] = useState({
    row: 0,
    column: 0,
  });
  const [toyRobotDirection, setToyRobotDirection] = useState("NORTH");
  const [rotationClass, setRotationClass] = useState(0);

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

  const startGame = () => {
    setGameOver(false);

    setUser((prevUser) => prevUser + 1);
    setScore(0);
    setTimeLeft(60);

    setToyRobotPosition({
      row: Math.floor(rows / 2),
      column: Math.floor(columns / 2),
    });
    setTargetSquarePosition({ row: 0, column: 0 });
  };

  const moveToyRobot = () => {
    setToyRobotPosition((prevPosition) => {
      let { row, column } = prevPosition;

      if (toyRobotDirection === "NORTH") row--;
      else if (toyRobotDirection === "EAST") column++;
      else if (toyRobotDirection === "SOUTH") row++;
      else if (toyRobotDirection === "WEST") column--;

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

      const generateRandomPosition = () => {
        const randomRow = Math.floor(Math.random() * rows);
        const randomColumn = Math.floor(Math.random() * columns);
        return { row: randomRow, column: randomColumn };
      };

      if (targetSquarePosition.row === 0 && targetSquarePosition.column === 0) {
        setTargetSquarePosition(generateRandomPosition());
      } else {
        if (
          toyRobotPosition.row === targetSquarePosition.row &&
          toyRobotPosition.column === targetSquarePosition.column
        ) {
          setScore((prevScore) => prevScore + 1);
          setTargetSquarePosition(generateRandomPosition());
        }
      }

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || gameOver) {
      setGameOver(true);

      // Get current game data
      const currentGameData = { user, score: score };

      // Retrieve leaderboard from sessionStorage
      let leaderboard = JSON.parse(sessionStorage.getItem("leaderboard")) || [];

      // Check if the user already exists in the leaderboard
      const existingUser = leaderboard.findIndex((data) => data.user === user);

      if (existingUser !== -1) {
        // If the user exists, update their score
        leaderboard[existingUser].score = score;
      } else {
        // Otherwise, add the user to the leaderboard
        leaderboard.push(currentGameData);
      }

      // Store updated leaderboard in sessionStorage
      sessionStorage.setItem("leaderboard", JSON.stringify(leaderboard));

      // Dispatch custom event to notify about the update
      const event = new Event("leaderboardUpdate");
      window.dispatchEvent(event);
    }
  }, [
    toyRobotPosition,
    rows,
    columns,
    targetSquarePosition,
    timeLeft,
    gameOver,
    score,
    user,
  ]);

  return (
    <main>
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {gameBoard}

        <div
          className={`bg-gray-700 w-full h-full flex items-center justify-center text-xl ${rotationClass}`}
          style={{
            gridRowStart: toyRobotPosition.row + 1,
            gridColumnStart: toyRobotPosition.column + 1,
          }}
        >
          🤖⬆️
        </div>

        <div
          className="bg-yellow-300 w-full h-full flex items-center justify-center text-2xl"
          style={{
            gridRowStart: targetSquarePosition.row + 1,
            gridColumnStart: targetSquarePosition.column + 1,
          }}
        >
          ⚙️
        </div>
      </div>

      <div className="flex justify-between">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
      </div>

      {gameOver ? (
        <button onClick={startGame}>Play Again</button>
      ) : (
        <div className="controls">
          <button onClick={rotateLeft}>Left</button>
          <button onClick={moveToyRobot}>Move</button>
          <button onClick={rotateRight}>Right</button>
        </div>
      )}
    </main>
  );
};

export default GameBoard;
