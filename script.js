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

    playerMove: function (playerName, containerEvent) {
      let mapValue = containerEvent.target.getAttribute("data-board-cell");
      let outerArrayValue = gameBoardModule.outerArrayMap[mapValue];
      let innerArrayValue = gameBoardModule.innerArrayMap[mapValue];

      gameBoardModule.gameBoard.gameBoardArray[outerArrayValue].splice(
        innerArrayValue,
        1,
        playerName
      );
      displayControllerModule.displayController.renderSelction(
        playerName,
        containerEvent
      );
    },

    rounds: function (containerEvent) {
      const playerOne = player("X");
      const playerTwo = player("O");
      // gameLogic.gameOver();
      if (gameLogic.roundTracker % 2 === 0) {
        containerEvent.target.classList.add("spaceTakenO");

        gameLogic.playerMove(playerTwo.getName(), containerEvent);
        displayControllerModule.displayController.renderTurn(
          playerOne.getName()
        );

        gameLogic.roundTracker += 1;
      } else {
        containerEvent.target.classList.add("spaceTakenX");

        gameLogic.playerMove(playerOne.getName(), containerEvent);
        displayControllerModule.displayController.renderTurn(
          playerTwo.getName()
        );
        gameLogic.roundTracker += 1;
      }
    },

    winCombo: (winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]),

    checkWin: function () {
      const allCell = document.querySelectorAll("[data-board-cell]");
      return gameBoardModule.gameLogic.winCombo.some((combination) => {
        return combination.every((index) => {
          return allCell[index].classList.contains(
            "spaceTakenX" || "spaceTakenO"
          );
        });
      });
    },
  };

  // Check if space is taken
  const gameBoardContainer = document.querySelector("#game-board");
  gameBoardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("spaceTakenX" || "spaceTaken)4"))
      return;

    gameLogic.rounds(this.event);
    if (gameBoardModule.gameLogic.checkWin()) {
      console.log("win");
    }
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

    renderSelction: function (playerName, event) {
      event.target.innerHTML = playerName;
    },
    renderTurn: function (currentTurn) {
      const playerTurn = document.getElementById("player-turn");

      playerTurn.innerHTML = `Player ${currentTurn}'s turn`;
    },
  };

  return { displayController };
})();

// player factory
const player = (playerName) => {
  const getName = () => playerName;

  return { getName };
};

displayControllerModule.displayController.renderBoard();
