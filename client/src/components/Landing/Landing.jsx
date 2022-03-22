import React from "react";
import "./Landing.scss";

function Landing() {
  return (
    <div className="startContainer">
      <h1 className="startContainer__title">Tic Tac Toe</h1>
      <button className="startContainer__btn btn--start">Start New</button>
      <button className="startContainer__btn btn--join">Join Game</button>
    </div>
  );
}

export default Landing;
