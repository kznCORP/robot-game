import React, { useEffect, useState } from "react";

import Board from "./Board";
import Controls from "./Controls";
import Leaderboard from "./Leaderboard";
import Score from "./Score";
import ToyRobot from "./ToyRobot";
import TargetSquare from "./TargetSquare";
import Timer from "./Timer";
import Instructions from "./Instructions";

const Game = ({ rows, columns }) => {
  const [user, setUser] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const [toyRobotDirection, setToyRobotDirection] = useState("NORTH");
  const [rotationClass, setRotationClass] = useState(0);

  const [toyRobotPosition, setToyRobotPosition] = useState({
    row: Math.floor(rows / 2),
    column: Math.floor(columns / 2),
  });
  const [targetSquarePosition, setTargetSquarePosition] = useState({
    row: 0,
    column: 0,
  });

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

  if ((rows * columns) % 2 === 0) {
    throw new Error(
      "Grid dimensions must be odd numbers to center the Toy Robot."
    );
  }

  return (
    <section className="md:max-w-lg">
      <div className="flex justify-between mb-6">
        <Score score={score} />
        <Timer timeLeft={timeLeft} />
      </div>

      <Board rows={rows} columns={columns}>
        <ToyRobot position={toyRobotPosition} rotationClass={rotationClass} />
        <TargetSquare position={targetSquarePosition} />
      </Board>

      {gameOver ? (
        <div className="w-full flex items-center justify-center">
          <button
            onClick={startGame}
            className="mt-8 bg-blue-400 w-1/2 self-center h-full uppercase text-xs whitespace-nowrap text-white py-4 rounded-md hover:bg-gray-500 hover:text-white"
          >
            Play Again
          </button>
        </div>
      ) : (
        <Controls
          rows={rows}
          columns={columns}
          toyRobotDirection={toyRobotDirection}
          setToyRobotPosition={setToyRobotPosition}
          setToyRobotDirection={setToyRobotDirection}
          setGameOver={setGameOver}
          setRotationClass={setRotationClass}
        />
      )}

      <Instructions />

      <Leaderboard user={user} score={score} gameOver={gameOver} />
    </section>
  );
};

export default Game;
