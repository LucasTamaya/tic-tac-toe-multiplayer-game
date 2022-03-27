import React from "react";
import "./WinnerPrompt.scss";

function WinnerPrompt({ winner, restartGame }) {
  return (
    <div className="winnerPrompt__bg">
      <div className="winnerPrompt__container">
        <p className="winnerPrompt__para">
          {winner === "Equality"
            ? "Equality !"
            : winner === sessionStorage.getItem("name")
            ? "You won !"
            : `${winner} won !`}
        </p>
        <button className="winnerPrompt__btn" onClick={() => restartGame()}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default WinnerPrompt;
