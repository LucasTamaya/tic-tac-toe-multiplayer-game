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
    return "Player 1 won";
  }
};

export default gameResult;
