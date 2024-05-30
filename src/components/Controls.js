import React from "react";

const Controls = ({
  setToyRobotPosition,
  toyRobotDirection,
  setToyRobotDirection,
  setGameOver,
  rows,
  columns,
  setRotationClass,
}) => {
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

  return (
    <section className="mt-6 flex justify-between gap-6">
      <button
        onClick={rotateLeft}
        className="bg-blue-400 w-full h-full uppercase text-xs whitespace-nowrap text-white py-4 rounded-md hover:bg-gray-500 hover:text-white"
      >
        Turn Left
      </button>
      <button
        onClick={moveToyRobot}
        className="bg-blue-400 w-full h-full uppercase text-xs whitespace-nowrap text-white py-4 rounded-md hover:bg-gray-500 hover:text-white"
      >
        Move +1
      </button>
      <button
        onClick={rotateRight}
        className="bg-blue-400 w-full h-full uppercase text-xs whitespace-nowrap text-white py-4 rounded-md hover:bg-gray-500 hover:text-white"
      >
        Turn Right
      </button>
    </section>
  );
};

export default Controls;
