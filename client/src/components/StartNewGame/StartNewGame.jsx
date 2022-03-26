import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./StartNewGame.scss";

function StartNewGame() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Empêche le rechargement automatique de la page
    e.preventDefault();

    // Si input vide, on ne fait rien
    if (name === "") {
      return; 
    }

    // Si input non vide
    if (name !== "") {
      // Création du room ID unique
      const roomId = uuid();

      // Enregistrement du nom de l'utilisateur dans le sessionStorage afin d'y avoir accès dans la game room
      sessionStorage.setItem("name", name);

      // Envoit l'utilisateur vers la game room correspondant à l'id crée juste avant
      navigate(`/game-room/${roomId}`);
    }
  };

  return (
    <form className="newGameForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name..."
        className="newGameForm__input"
        onChange={(e) => setName(e.target.value)}
      />

      <div className="newGameForm__btnContainer">
        <Link to="/" className="newGameForm__btn">
          <button className="back--btn">Back</button>
        </Link>

        <div className="newGameForm__btn" type="submit">
          <button className="go--btn">Let's go</button>
        </div>
      </div>
    </form>
  );
}

export default StartNewGame;
