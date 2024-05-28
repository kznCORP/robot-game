// The leaderboard should display a table of games and users, ranked by game score.
//  It is sufficient to store this information in browser memory.

import React, { useEffect, useState } from "react";

/*
  Up Next:
  - [x] Display Leaderboard correctly.
  - Refactor code into Modular parts
  - Improve Design, mobile responsiveness.
  - Send along with most memorable moment in building something.

  Total time: 7 hours 28 minutes.

*/

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  const fetchScores = () => {
    const scoresJSON = sessionStorage.getItem("leaderboard");
    if (scoresJSON) {
      const scoresArray = JSON.parse(scoresJSON);
      scoresArray.sort((a, b) => b.score - a.score);
      setScores(scoresArray);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchScores();

    // Add the event listeners
    window.addEventListener("leaderboardUpdate", fetchScores);
    return () => {
      window.removeEventListener("leaderboardUpdate", fetchScores);
    };
  }, []);

  return (
    <div className="mt-10">
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((item, index) => (
          <li key={index}>
            User: {item.user}, Score: {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
