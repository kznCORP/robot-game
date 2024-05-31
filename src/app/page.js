"use client";

import React from "react";

import Game from "@/components/Game";
export default function Home() {
  return (
    <main className="w-full h-screen px-10 flex-col items-center justify-center">
      <header>
        <h1 className="text-xl font-medium my-12 text-center uppercase tracking-tighter">
          Toy Robot Challenge
        </h1>
      </header>
      <section className="w-full flex justify-center">
        <Game rows={5} columns={5} />
      </section>
    </main>
  );
}
