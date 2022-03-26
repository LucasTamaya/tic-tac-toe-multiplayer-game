// Fonction afin de savoir si une room existe parmis un tableau de rooms
const existingRoom = (roomIdsTab, roomId) => {
  // Si la room existe
  if (roomIdsTab.some((x) => x.id === roomId)) {
    return true;
  } else {
    console.log(roomId)
    // Si la room n'existe pas encore
    return false;
  }
};

export default existingRoom;
