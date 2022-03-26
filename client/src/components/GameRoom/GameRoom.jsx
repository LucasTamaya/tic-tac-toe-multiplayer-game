import React from "react";
import "./GameRoom.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import template from "../utils/template";
import useClipboard from "react-hook-clipboard";
import Grid from "../Grid/Grid";
import gameResult from "../utils/gameResult";

// Connexion du websocket client au serveur
const socket = io(template); //url à changer lors de la mise en production afin de pointer vers le serveur heroku

function GameRoom() {
  const [players, setPlayers] = useState([]);

  const [index, setIndex] = useState(0);

  // Récupération du room id dans les paramètres de l'url
  const { roomId } = useParams();

  const navigate = useNavigate();

  const [clipboard, copyToClipboard] = useClipboard();

  const [grid, setGrid] = useState([
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
    {
      fullfiled: false,
      value: undefined,
    },
  ]);

  const [nbCheckBox, setNbCheckBox] = useState(0);

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
      console.log(data);
      const { index, updateGrid, nbCheckBox } = data;
      setIndex(index);
      setGrid(updateGrid);
      setNbCheckBox(nbCheckBox);

      // Test pour savoir si un joueur à gagner
      const gameResult = gameResult(updateGrid);

      if (gameResult === "Player 1 won") {
        alert("Player 1 won");
      }
      // Test si toutes les cases ont été cochées et qu'il a égalité
      if (nbCheckBox === 9) {
        alert("Equality, the game is finish");
      }
    });
  }, [socket]);

  const changeTurn = (updateGrid) => {
    socket.emit("change_turn", {
      roomId: roomId,
      index: index,
      updateGrid: updateGrid,
      nbCheckBox: nbCheckBox,
    });
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

          <Grid
            grid={grid}
            setGrid={setGrid}
            players={players}
            index={index}
            changeTurn={changeTurn}
            socket={socket}
            roomId={roomId}
          />

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
