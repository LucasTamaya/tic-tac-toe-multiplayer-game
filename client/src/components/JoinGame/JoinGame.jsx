import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import template from "../utils/template";
import "./JoinGame.scss";

function JoinGame() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Empêche le rechargement automatique de la page
    e.preventDefault();

    // Si inputs vide, on ne fait rien
    if (name === "" && roomId === "") {
      return;
    }

    // Si inputs non vide, on vérifie que l'id existe dans la liste des roomIds
    if (name !== "" && roomId !== "") {
      const req = await axios.get(`${template}join-game/${roomId}`);

      console.log(req);

      // Si la room n'existe pas, on affiche un message d'erreur
      if (req.data.state === "Error") {
        alert("You are trying to join a room that doesn't exists");
      }

      // Si la room existe, on envoit l'utilisateur vers la game room correspondante
      if (req.data.state === "Success") {
        // Enregistrement du nom de l'utilisateur dans le sessionStorage afin d'y avoir accès dans la game room
        sessionStorage.setItem("name", name);
        navigate(`/game-room/${roomId}`);
      }
    }
  };

  return (
    <form className="joinGameForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name..."
        className="joinGameForm__input"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Room ID"
        className="joinGameForm__input"
        onChange={(e) => setRoomId(e.target.value)}
      />

      <div className="joinGameForm__btnContainer">
        <Link to="/" className="joinGameForm__btn">
          <button className="back--btn">Back</button>
        </Link>

        <div className="joinGameForm__btn" type="submit">
          <button className="go--btn">Let's go</button>
        </div>
      </div>
    </form>
  );
}

export default JoinGame;
