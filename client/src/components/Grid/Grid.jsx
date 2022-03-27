import React from "react";
import "./Grid.scss";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function Grid({ grid, setGrid, players, index, changeTurn }) {
  // Sélection du motif selon le joueur
  let motif;

  if (players[0] === sessionStorage.getItem("name")) {
    motif = "O";
  } else {
    motif = "X";
  }

  const updateGrid = (gridIndex) => {
    // Copie de la grid
    const updateGrid = Array.from(grid);

    // Si la case a deja ete cochée / si ce n'est pas au joueur de jouer, on ne fait rien
    if (
      updateGrid[gridIndex].fullfiled ||
      players[index] != sessionStorage.getItem("name")
    ) {
      return;
    }
    if (!updateGrid[gridIndex].fullfiled) {
      // Remplit la grid
      updateGrid[gridIndex].fullfiled = true;
      updateGrid[gridIndex].value = motif;
      console.log(updateGrid);

      // Met à jour la grid
      setGrid(updateGrid);

      // Modifie le play turn afin de laisser l'autre joueur jouer
      changeTurn(updateGrid);
    }
  };

  return (
    <div
      className={`gridContainer ${
        players[index] === sessionStorage.getItem("name") ? "active" : "disable" //Permet d'autoriser ou pas les joueurs de cliquer sur la grille selon le play turn
      }`}
    >
      {grid.map((x, index) => (
        <div key={index} className="box" onClick={() => updateGrid(index)}>
          {x.value == "O" ? (
            <CircleOutlinedIcon sx={{ fontSize: 75, color: "white" }} /> // Coche la case avec un rond
          ) : x.value == "X" ? (
            <CloseOutlinedIcon sx={{ fontSize: 85, color: "white" }} /> // Coche la case avec une croix
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default Grid;
