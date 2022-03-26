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

  socket.on("join_room", (data) => {
    const { roomId, name } = data;
    socket.join(roomId);
    const isExistingRoom = existingRoom(roomIdsTab, roomId);

    // si la room n'existe pas encore
    if (!isExistingRoom) {
      roomIdsTab.push({
        id: roomId,
        players: [name],
      });
    }

    // si la room existe deja
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
    console.log(roomIdsTab);
    let nbClient = io.sockets.adapter.rooms.get(roomId).size;
    if (nbClient === 2) {
      // récupère les deux joueurs de la room
      let players;
      roomIdsTab.map((x) => {
        if (x.id === roomId) {
          players = x.players;
        }
      });
      io.to(roomId).emit("start_game", players);

      console.log(players);
    }
    if (nbClient > 2) {
      socket.emit("room_full");
      socket.leave();
      console.log(nbClient);
    }
  });

  socket.on("change_turn", (data) => {
    const { roomId, index, updateGrid, nbCheckBox } = data;
    console.log(nbCheckBox);
    if (index === 0) {
      io.to(roomId).emit("change_turn_client", {
        index: 1,
        updateGrid: updateGrid,
        nbCheckBox: nbCheckBox + 1,
      });
    }

    if (index === 1) {
      io.to(roomId).emit("change_turn_client", {
        index: 0,
        updateGrid: updateGrid,
        nbCheckBox: nbCheckBox + 1,
      });
    }
  });
});

// Sélection du port que va utiliser notre serveur
const PORT = process.env.PORT || 1338;

// Démarrage du serveur
server.listen(PORT, function () {
  console.log("listening on port :1338");
});
