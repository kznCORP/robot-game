"use client";

import React, { useEffect, useState } from "react";

import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">GameBoard</h1>
        <GameBoard rows={5} columns={5} />
      </div>
    </main>
  );
}
