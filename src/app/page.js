"use client";

import React from "react";

import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="w-full h-screen flex-1 px-10 text-center bg-green-300">
      <h1 className="text-6xl font-bold mb-8">GameBoard</h1>
      <Game rows={5} columns={5} />
    </main>
  );
}
