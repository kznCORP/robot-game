"use client";

import React from "react";

import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="w-full h-screen flex-1 px-10 ">
      <h1 className="text-2xl font-medium my-12 text-center">Toy Robot Challenge</h1>
      <Game rows={5} columns={5} />
    </main>
  );
}
