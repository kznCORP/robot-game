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
    <div className="controls">
      <button onClick={rotateLeft}>Left</button>
      <button onClick={moveToyRobot}>Move</button>
      <button onClick={rotateRight}>Right</button>
    </div>
  );
};

export default Controls;
