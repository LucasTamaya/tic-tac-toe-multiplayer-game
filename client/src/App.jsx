import React from "react";
import { Routes, Route } from "react-router-dom";
import GameRoom from "./components/GameRoom/GameRoom";
import JoinGame from "./components/JoinGame/JoinGame";
import Landing from "./components/Landing/Landing";
import StartNewGame from "./components/StartNewGame/StartNewGame";

function App() {
  return (
    <main className="mainContainer">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Start New Game Page */}
        <Route path="/start-new-game" element={<StartNewGame />} />

        {/* Join Game Page */}
        <Route path="/join-game" element={<JoinGame />} />

        {/* Game Room */}
        <Route path="/game-room/:roomId" element={<GameRoom />} />
      </Routes>
    </main>
  );
}

export default App;
