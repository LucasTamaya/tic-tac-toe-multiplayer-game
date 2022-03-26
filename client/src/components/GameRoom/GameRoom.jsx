import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import template from "../utils/template";
import axios from "axios";
import useClipboard from "react-hook-clipboard";
import "./GameRoom.scss";

// Connexion du websocket client au serveur
const socket = io(template); //url à changer lors de la mise en production afin de pointer vers le serveur heroku

function GameRoom() {
  const [players, setPlayers] = useState([]);

  const [index, setIndex] = useState(0);

  // Récupération du room id dans les paramètres de l'url
  const { roomId } = useParams();

  const navigate = useNavigate();

  const [clipboard, copyToClipboard] = useClipboard();

  useEffect(() => {
    socket.emit("join_room", {
      roomId: roomId,
      name: sessionStorage.getItem("name"),
    });
  }, []);

  useEffect(() => {
    socket.on("start_game", (data) => {
      setPlayers(data);
    });

    socket.on("change_turn_client", (data) => {
      setIndex(data);
    });
  }, [socket]);

  const changeTurn = () => {
    socket.emit("change_turn", { roomId: roomId, index: index });
  };

  return (
    <>
      {players.length === 0 && (
        <div className="promptContainer">
          <h2 className="promptContainer__h2">
            Waiting for players to connect
          </h2>
          <p className="promptContainer__p">
            Give your friend the following room ID to connect
          </p>
          <span className="promptContainer__span">{roomId}</span>
          <button
            className="promptContainer__btn"
            onClick={() => copyToClipboard(roomId)}
          >
            Copy
          </button>
        </div>
      )}

      {players.length === 2 && (
        <div className="gameContainer">
          {players[index] === sessionStorage.getItem("name") ? (
            <h2 className="gameContainer__h2">Your turn</h2>
          ) : (
            <h2 className="gameContainer__h2">{players[index]} turn</h2>
          )}

          <h3 className="scoreboard__h3">Scoreboard</h3>
          <div className="scoreboard__container">
            <div className="scoreboard__item">
              <span>You</span>
              <span>0</span>
            </div>
            <div className="scoreboard__item">
              <span>
                {players.filter((x) => x !== sessionStorage.getItem("name"))}
              </span>
              <span>0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameRoom;
