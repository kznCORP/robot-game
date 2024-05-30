import React from "react";

const TargetSquare = ({ position }) => (
  <div
    className="bg-yellow-300 w-full h-full flex items-center justify-center text-2xl"
    style={{
      gridRowStart: position.row + 1,
      gridColumnStart: position.column + 1,
    }}
  >
    ⚙️
  </div>
);

export default TargetSquare;
