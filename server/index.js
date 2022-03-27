import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import existingRoom from "./utils/existingRoom.js";

const app = express();
app.use(cors());
app.use(express.json());

// Tableau qui va contenir temporairement les room Ids
let roomIdsTab = [];

app.get("/", function (req, res) {
  res.send("The server is running!");
});

app.get("/join-game/:roomId", function (req, res) {
  const { roomId } = req.params;

  return res.send({ state: "Success" });
});

// Création du serveur avec les websockets
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Détecte la connexion d'un nouvel utilisateur
io.on("connection", (socket) => {
  console.log("User connected");

  // Détecte la déconnexion d'un nouvel utilisateur
  socket.on("disconnect", () => {
    console.log("A user just disconnected");
  });

  // Détecte la connexion à une room
  socket.on("join_room", (data) => {
    const { roomId, name } = data;
    socket.join(roomId);
    // Test afin de voir si la room existe ou non
    const isExistingRoom = existingRoom(roomIdsTab, roomId);

    // Si la room n'existe pas encore
    if (!isExistingRoom) {
      roomIdsTab.push({
        id: roomId,
        players: [name],
      });
    }

    // Si la room existe deja
    if (isExistingRoom) {
      roomIdsTab.map((x) => {
        if (x.id === roomId) {
          if (x.players.length === 2) {
            return;
          } else {
            x.players.push(name);
          }
        }
      });
    }

    // Récupère le nombre de clients présent dans une room
    let nbClient = io.sockets.adapter.rooms.get(roomId).size;

    // Si deux client sont connectés dans la même room
    if (nbClient === 2) {
      // On récupère le nom des deux joueurs de la room
      let players;
      roomIdsTab.map((x) => {
        if (x.id === roomId) {
          players = x.players;
        }
      });

      // On envoit aux clients de la room l'event afin de commencer la partie entre eux
      io.to(roomId).emit("start_game", players);
    }

    // Si un 3eme joueur ou plus se connecte dans une même room, on déconnecte ce client et on envoit un event d'erreur afin de rediriger le joueur à l'accueil
    if (nbClient > 2) {
      socket.emit("room_full");
      socket.leave();
    }
  });

  // Détecte lorsqu'on coche une case de la grille de jeux
  socket.on("change_turn", (data) => {
    const { roomId, index, updateGrid, nbCheckBox, players } = data;
    // Ici, on fait en sorte d'indiquer que c'est au player 2 de jouer
    if (index === 0) {
      // Renvoit un event aux clients afin de mettre à jour les valeurs nécessaires
      io.to(roomId).emit("change_turn_client", {
        index: 1,
        updateGrid: updateGrid,
        nbCheckBox: nbCheckBox + 1,
        players,
      });
    }
    // Ici, on fait en sorte d'indiquer que c'est au player 2 de jouer
    if (index === 1) {
      // Renvoit un event aux clients afin de mettre à jour les valeurs nécessaires
      io.to(roomId).emit("change_turn_client", {
        index: 0,
        updateGrid: updateGrid,
        nbCheckBox: nbCheckBox + 1,
        players,
      });
    }
  });

  // Détecte lorsqu'on souhaite redémarrer une nouvelle partie
  socket.on("restart_game", (data) => {
    const { emptyGrid } = data;
    // Renvoit un event aux clients avec la grille de jeu vide
    socket.emit("restart_game_client", {
      emptyGrid: emptyGrid,
    });
  });
});

// Sélection du port que va utiliser notre serveur
const PORT = process.env.PORT || 1338;

// Démarrage du serveur
server.listen(PORT, function () {
  console.log(`Listen on port ${PORT}`);
});
