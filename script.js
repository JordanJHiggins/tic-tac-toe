// Game board
const gameBoardModule = (function () {
  const gameBoard = {
    gameBoardArray: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };

  const outerArrayMap = {
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

  return { gameBoard, outerArrayMap, innerArrayMap };
})();

// Render display
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
    renderSelction: function (playerName) {
      gameBoardContainer.addEventListener("click", (event) => {
        let mapValue = event.target.getAttribute("data-board-cell");
        let outerArrayValue = gameBoardModule.outerArrayMap[mapValue];
        let innerArrayValue = gameBoardModule.innerArrayMap[mapValue];

        if (event.target.innerHTML != "X" || "O") {
          gameBoardModule.gameBoard.gameBoardArray[outerArrayValue].splice(
            innerArrayValue,
            1,
            playerName
          );
          event.target.innerHTML = playerName;
        }
      });
    },
    renderPlayers: function () {},
  };

  return { displayController, gameBoardContainer };
})();

// Game logic
const gameLogicModule = (function () {
  const gameLogic = {
    rounds: function () {
      const playerOne = player();
      const playerTwo = player();
      const gameBoardContainer = displayControllerModule.gameBoardContainer;
      let roundTracker = 1;

      gameBoardContainer.addEventListener("click", () => {
        if (roundTracker % 2 === 0) {
          playerOne.makeSelection("O");
          console.log("binggggg");
          roundTracker++;
        } else {
          playerTwo.makeSelection("x");
          roundTracker++;
        }
      });
    },
  };

  return { gameLogic };
})();

// player factory
const player = () => {
  const makeSelection = (playerName) =>
    displayControllerModule.displayController.renderSelction(playerName);

  return { makeSelection };
};

displayControllerModule.displayController.renderBoard();
gameLogicModule.gameLogic.rounds();
