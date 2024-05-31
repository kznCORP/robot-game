import React from "react";

const Score = ({ score }) => {
  return (
    <div className="text-start">
      <h2 className="uppercase text-xs whitespace-nowrap text-blue-400 ">
        Score
      </h2>
      <p>{score}</p>
    </div>
  );
};

export default Score;
