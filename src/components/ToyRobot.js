import React from "react";

const ToyRobot = ({ position, rotationClass }) => {
  return (
    <div
      className={`bg-gray-700 w-full h-full flex items-center justify-center text-xl ${rotationClass}`}
      style={{
        gridRowStart: position.row + 1,
        gridColumnStart: position.column + 1,
      }}
    >
      🤖⬆️
    </div>
  );
};

export default ToyRobot;
