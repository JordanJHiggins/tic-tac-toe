// modules
const gameBoardModule = (function () {
  const gameBoard = {
    gameBoardArray: [
      ["x", "o", "x"],
      ["x", "o", "o"],
      ["x", "x", "x"],
    ],
  };

  return { gameBoard };
})();

const displayControllerModule = (function () {
  const displayController = {
    renderBoard: function () {
      const gameBoardContainer = document.querySelector("#game-board");
      gameBoardContainer.innerHTML = gameBoardModule.gameBoard.gameBoardArray;
    },
    renderPlayers: function () {},
  };

  return { displayController };
})();

const gameLogicModule = (function () {
  const gameLogic = {};
})();

// player factory
const player = (name) => {
  let playerName = name;

  return {};
};

displayControllerModule.displayController.renderBoard();
