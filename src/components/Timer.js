import React from "react";

const Timer = ({ timeLeft }) => {
  return (
    <div>
      <h2 className="uppercase text-xs whitespace-nowrap text-blue-400 ">
        Time Left
      </h2>
      <time>
        {timeLeft}
        <span className="text-[10px]">s</span>
      </time>
    </div>
  );
};

export default Timer;
