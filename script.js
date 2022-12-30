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

  const gameLogic = {
    roundTracker: 1,
    rounds: function (myEvent) {
      const playerOne = player("x");
      const playerTwo = player("O");

      if (gameLogic.roundTracker % 2 === 0) {
        myEvent.target.classList.add("spaceTaken");

        displayControllerModule.displayController.renderSelction(
          playerTwo.getName()
        );
        console.log("binggggg");
        gameLogic.roundTracker += 1;
      } else {
        myEvent.target.classList.add("spaceTaken");
        displayControllerModule.displayController.renderSelction(
          playerOne.getName()
        );
        gameLogic.roundTracker += 1;
      }
    },
  };
  // Validate selection
  const gameBoardContainer = document.querySelector("#game-board");
  gameBoardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("spaceTaken")) return;

    gameLogic.rounds(this.event);
  });

  return { gameBoard, outerArrayMap, innerArrayMap, gameLogic };
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
      let mapValue = event.target.getAttribute("data-board-cell");
      let outerArrayValue = gameBoardModule.outerArrayMap[mapValue];
      let innerArrayValue = gameBoardModule.innerArrayMap[mapValue];

      gameBoardModule.gameBoard.gameBoardArray[outerArrayValue].splice(
        innerArrayValue,
        1,
        playerName
      );
      event.target.innerHTML = playerName;
    },
    renderPlayers: function () {},
  };

  return { displayController };
})();

// player factory
const player = (playerName) => {
  const getName = () => playerName;

  return { getName };
};

displayControllerModule.displayController.renderBoard();
