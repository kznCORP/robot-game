import React, { useEffect, useState } from "react";

const Leaderboard = ({ user, score, gameOver }) => {
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
    fetchScores();
    window.addEventListener("leaderboardUpdate", fetchScores);

    if (gameOver) {
      // Get current game data
      const currentGameData = { user, score: score };

      // Retrieve leaderboard from sessionStorage
      let leaderboard = JSON.parse(sessionStorage.getItem("leaderboard")) || [];

      // Check if the user already exists in the leaderboard
      const existingUser = leaderboard.findIndex((data) => data.user === user);

      if (existingUser !== -1) {
        // If the user exists, update their score
        leaderboard[existingUser].score = score;
      } else {
        // Otherwise, add the user to the leaderboard
        leaderboard.push(currentGameData);
      }

      // Store updated leaderboard in sessionStorage
      sessionStorage.setItem("leaderboard", JSON.stringify(leaderboard));

      // Dispatch custom event to notify about the update
      const event = new Event("leaderboardUpdate");
      window.dispatchEvent(event);
    }

    return () => {
      window.removeEventListener("leaderboardUpdate", fetchScores);
    };
  }, [user, score, gameOver]);

  return (
    <section className="w-full mt-8 pb-12 text-center text-slate-500 uppercase text-xs">
      <h2 className="font-bold mb-2">Leaderboard</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-slate-300">User</th>
            <th className="border border-slate-300">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((gameData, index) => (
            <tr key={index}>
              <td className="border border-slate-300">
                Player {gameData.user}
              </td>
              <td className="border border-slate-300">{gameData.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;
