import React, { useState, useEffect } from "react";

const ToyRobot = ({ gridRows, gridColumns }) => {
  // Initialize the robot's position in the middle of the grid
  const [position, setPosition] = useState({
    row: Math.floor(gridRows / 2),
    column: Math.floor(gridColumns / 2),
  });

  return (
    <div
      className="bg-red-500 w-full h-full flex items-center justify-center"
      style={robotStyle}
    >
      🤖
    </div>
  );
};

export default ToyRobot;
