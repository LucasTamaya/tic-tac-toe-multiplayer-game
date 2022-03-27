const gameResult = (grid) => {
  // Toutes les possibilités de gagner pour le joueur 1
  if (
    (grid[0].value === "O" && grid[1].value === "O" && grid[2].value === "O") ||
    (grid[0].value === "O" && grid[3].value === "O" && grid[6].value === "O") ||
    (grid[0].value === "O" && grid[4].value === "O" && grid[8].value === "O") ||
    (grid[3].value === "O" && grid[4].value === "O" && grid[5].value === "O") ||
    (grid[1].value === "O" && grid[4].value === "O" && grid[7].value === "O") ||
    (grid[6].value === "O" && grid[4].value === "O" && grid[2].value === "O") ||
    (grid[6].value === "O" && grid[7].value === "O" && grid[8].value === "O") ||
    (grid[2].value === "O" && grid[5].value === "O" && grid[8].value === "O")
  ) {
    return "Player 1";
  }

  // Toutes les possibilités de gagner pour le joueur 2
  if (
    (grid[0].value === "X" && grid[1].value === "X" && grid[2].value === "X") ||
    (grid[0].value === "X" && grid[3].value === "X" && grid[6].value === "X") ||
    (grid[0].value === "X" && grid[4].value === "X" && grid[8].value === "X") ||
    (grid[3].value === "X" && grid[4].value === "X" && grid[5].value === "X") ||
    (grid[1].value === "X" && grid[4].value === "X" && grid[7].value === "X") ||
    (grid[6].value === "X" && grid[4].value === "X" && grid[2].value === "X") ||
    (grid[6].value === "X" && grid[7].value === "X" && grid[8].value === "X") ||
    (grid[2].value === "X" && grid[5].value === "X" && grid[8].value === "X")
  ) {
    return "Player 2";
  }
};

export default gameResult;
