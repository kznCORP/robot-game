import React from "react";

const Board = ({ rows, columns, children }) => {
  const gameBoard = [];
  for (let i = 0; i < rows * columns - 2; i++) {
    gameBoard.push(
      <div
        key={i}
        className="bg-gray-50 border border-gray-100 h-full w-full flex items-center justify-center"
      >
        <p className="text-gray-200">{i + 1}</p>
      </div>
    );
  }

  return (
    <div
      className="grid aspect-square"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {gameBoard}

      {/* Toy Robot & Target Square to be included into the grid. */}
      {children}
    </div>
  );
};

export default Board;
