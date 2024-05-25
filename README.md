# Robot Game Challenge

The Robot Challenge tasks me with creating a game environment where a toy robot explores an initial 5x5 grid, aiming to reach as many targets as possible within 60 seconds. I aim to showcase my expertise in frontend design, and problem-solving skills by delivering the best possible solution.


## Table of Contents

- [Getting Started](#gettingstarted)
- [Objective](#objective)
- [Specifications](#specification)
- [Controls](#controls)
- [Scoring](#scoring)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Objective

o Implement a solution that meets the requirements below <br>
o Frontend must be written using Vue.js, React, or Angular. <br>
o A backend, if required, can be written in the tooling of your choice <br>
o Provide a README / Getting Started documentation <br>
o Time-limit yourself to 4-8hours <br>

## Specifications

The application is a simple game consisting of: <br>
o A square tabletop, 5 units x 5 units <br>
o A toy robot <br>
o A target square \
o A 60 second game timer <br>
o A leaderboard <br>

The objective of the game is for the robot to reach as many target squares as possible within the 60 second time limit.

## Controls

o Left: Rotate 90 degrees to the left without changing position <br>
o Right: Rotate 90 degrees to the right without changing position <br>
o Move: Move the robot one unit forward in the direction it is currently facing <br>

If the robot is driven over the edge of the table, the robot is destroyed, and the game is over.

## Scoring

The game score should be increased by 1 when the robot reaches the target square. <br>
A new target square should be spawned.
