import React from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";

function Landing() {
  return (
    <div className="startContainer">
      <h1 className="startContainer__title">Tic Tac Toe</h1>
      <Link to="/start-new-game" className="startContainer__btn start--btn">
        Start New
      </Link>
      <Link to="/join-game" className="startContainer__btn join--btn">
        Join Game
      </Link>
    </div>
  );
}

export default Landing;
