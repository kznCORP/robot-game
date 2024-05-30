import React from "react";

const Score = ({ score }) => {
  return (
    <div>
      <h2 className="uppercase text-xs whitespace-nowrap text-blue-400 ">
        Score
      </h2>
      <p>{score}</p>
    </div>
  );
};

export default Score;
