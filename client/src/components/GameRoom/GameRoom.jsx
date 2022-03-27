import React from "react";
import "./GameRoom.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import template from "../../utils/template";
import useClipboard from "react-hook-clipboard";
import Grid from "../Grid/Grid";
import gameResult from "../../utils/gameResult";
import emptyGrid from "../../utils/emptyGrid";
import WinnerPrompt from "../WinnerPrompt/WinnerPrompt";

// Connexion du websocket client au serveur
const socket = io(template); //url à changer lors de la mise en production afin de pointer vers le serveur heroku

function GameRoom() {
  // Va permettre de stocker les 2 players
  const [players, setPlayers] = useState([]);

  // Va permettre de switcher au niveau des play turns
  const [index, setIndex] = useState(0);

  // Récupération du room id dans les paramètres de l'url
  const { roomId } = useParams();

  // Permet de facilement faire un "copier coller" au click d'un bouton
  const [clipboard, copyToClipboard] = useClipboard();

  // Représente la grille du jeu
  const [grid, setGrid] = useState(emptyGrid);

  // Permet de détecter le nombre de cases cochées sur la grille
  const [nbCheckBox, setNbCheckBox] = useState(0);

  // Permet d'afficher le player winner / l'égalité
  const [winner, setWinner] = useState("");

  // Permet d'afficher le scoreboard des players
  const [score, setScore] = useState([
    {
      scorePlayer1: 0,
    },
    {
      scorePlayer2: 0,
    },
  ]);

  useEffect(() => {
    // Event au premier montage du composant afin de rejoindre la room
    socket.emit("join_room", {
      roomId: roomId,
      name: sessionStorage.getItem("name"),
    });
  }, []);

  useEffect(() => {
    // Event lorsque deux joueurs sont présents dans la room, afin de lancer la partie (c'est ici qu'on récupère le nom des 2 players)
    socket.on("start_game", (data) => {
      setPlayers(data);
    });

    // Event à chaque fois qu'un joueur coche une case
    socket.on("change_turn_client", (data) => {
      const { index, updateGrid, nbCheckBox, players } = data;
      // On modifie le playturn (si c'était le player 1 qui jouait, on indique maintenant que c'est au player 2 de jouer)
      setIndex(index);
      // On met à jour la grille avec le motif coché dans la case cliquée
      setGrid(updateGrid);
      // On incrémente la checkbox de 1
      setNbCheckBox(nbCheckBox);

      // Test pour savoir si un joueur à gagner
      const result = gameResult(updateGrid);

      // Si c'est le player 1 qui a gagné
      if (result === "Player 1") {
        // On incrémente de 1 le scoreboard du player 2
        const updateScore = Array.from(score);
        updateScore[0].scorePlayer1++;
        setScore(updateScore);
        // On indique dans le prompt que c'est le player 1 qui a gagné
        setWinner(players[0]);
      }

      // Si c'est le player 2 qui a gagné, on fait la même chose
      if (result === "Player 2") {
        const updateScore = Array.from(score);
        updateScore[1].scorePlayer2++;
        setScore(updateScore);
        setWinner(players[1]);
      }

      // Si toutes les cases ont été cochées et qu'il y a égalité
      if (nbCheckBox === 9) {
        // On indique dans le prompt qu'il y a une égalité
        setWinner("Equality");
      }
    });

    // Event lorsqu'on souhaite redémarrer une nouvelle partie
    socket.on("restart_game_client", (data) => {
      const { emptyGrid } = data;
      // Réinitialise la grille
      setGrid(emptyGrid);
      // Réinitialise le winner
      setWinner("");
      // Réinitialise le nombre de cases cochées
      setNbCheckBox(0);
    });
  }, [socket]);

  // Fonction afin de détecter lorsqu'on coche une case
  const changeTurn = (updateGrid) => {
    socket.emit("change_turn", {
      roomId: roomId,
      index: index,
      updateGrid: updateGrid,
      nbCheckBox: nbCheckBox,
      players: players,
    });
  };

  // Fonction afin de recommencer une nouvelle partie
  const restartGame = () => {
    // Réinitialise la grille avec les valeurs par défault
    emptyGrid.map((x) => {
      (x.fullfiled = false), (x.value = undefined);
    });

    // Envoit l'event côté serveur
    socket.emit("restart_game", {
      emptyGrid: emptyGrid,
    });
  };

  return (
    <>
      {/* Si il n'y a encore qu'un seul dans la room */}
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

      {/* Si deux joueurs sont présents dans la room */}
      {players.length === 2 && (
        <div className="gameContainer">
          {players[index] === sessionStorage.getItem("name") ? (
            <h2 className="gameContainer__h2">Your turn</h2>
          ) : (
            <h2 className="gameContainer__h2">{players[index]} turn</h2>
          )}

          {/* Grille de jeu */}
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
              <span>
                {players[0] === sessionStorage.getItem("name")
                  ? score[0].scorePlayer1
                  : score[1].scorePlayer2}
              </span>
            </div>
            <div className="scoreboard__item">
              <span>
                {players.filter((x) => x !== sessionStorage.getItem("name"))}
              </span>
              <span>
                {players[0] === sessionStorage.getItem("name")
                  ? score[1].scorePlayer2
                  : score[0].scorePlayer1}
              </span>
            </div>
          </div>

          {/* Lorsque la partie est finit, afin d'afficher le résultat */}
          {winner && <WinnerPrompt winner={winner} restartGame={restartGame} />}
        </div>
      )}
    </>
  );
}

export default GameRoom;
