// modules
const gameBoardModule = (function () {
  const gameBoard = {
    gameBoardArray: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };

  return { gameBoard };
})();

const displayControllerModule = (function () {
  const gameBoardContainer = document.querySelector("#game-board");
  const boardCell = document.createElement("div");

  const displayController = {
    renderBoard: function () {
      for (let i = 0; i < 9; i++) {
        boardCell.setAttribute("data-board-cell", i);
        boardCell.className = "board-cell";
        gameBoardContainer.insertAdjacentElement(
          "beforeend",
          boardCell.cloneNode(true)
        );
      }
    },
    renderSelction: function () {
      const selectionMap = {
        0: "0",
        1: "0",
        2: "0",
        3: "1",
        4: "1",
        5: "1",
        6: "2",
        7: "2",
        8: "2",
      };

      const innerArrayMap = {
        0: "0",
        1: "1",
        2: "2",
        3: "0",
        4: "1",
        5: "2",
        6: "0",
        7: "1",
        8: "2",
      };
      gameBoardContainer.addEventListener("click", (event) => {
        let mapValue = event.target.getAttribute("data-board-cell");

        let outerArrayValue = selectionMap[mapValue];
        let innerArrayValue = innerArrayMap[mapValue];

        console.log(`outer : ${outerArrayValue}`);

        console.log(`inner: ${innerArrayValue}`);

        gameBoardModule.gameBoard.gameBoardArray[outerArrayValue].splice(
          innerArrayValue,
          1,
          "x"
        );
        // event.target.innerHTML = `${gameBoardModule.gameBoard.gameBoardArray[1][2]}`;
      });
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
displayControllerModule.displayController.renderSelction();
console.log(gameBoardModule.gameBoard.gameBoardArray[2][1]);
