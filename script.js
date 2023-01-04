const player = (playerName) => {
  const getName = () => playerName;

  return { getName };
};

// Game board
const gameBoard = (function () {
  let gameBoardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

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

  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playerOne = player("X");
  const playerTwo = player("O");
  let roundTracker = 1;

  const playerMove = (playerName, containerEvent) => {
    let mapValue = containerEvent.target.getAttribute("data-board-cell");
    let outerArrayValue = outerArrayMap[mapValue];
    let innerArrayValue = innerArrayMap[mapValue];

    gameBoard.gameBoardArray[outerArrayValue].splice(
      innerArrayValue,
      1,
      playerName
    );
    displayController.renderSelction(playerName, containerEvent);
  };

  const playRound = (containerEvent) => {
    if (gameBoard.roundTracker % 2 === 0) {
      containerEvent.target.classList.add("spaceTakenO");

      playerMove(playerTwo.getName(), containerEvent);
      displayController.renderTurn(playerOne.getName());

      gameBoard.roundTracker++;
    } else {
      containerEvent.target.classList.add("spaceTakenX");

      playerMove(playerOne.getName(), containerEvent);
      displayController.renderTurn(playerTwo.getName());

      gameBoard.roundTracker++;
    }
  };

  const checkWin = (containerEvent) => {
    const allCell = document.querySelectorAll("[data-board-cell]");

    return winCombo.some((combination) => {
      return combination.every((index) => {
        return allCell[index].classList.contains(`spaceTaken${containerEvent}`);
      });
    });
  };

  const checkDraw = () => {
    const allCell = document.querySelectorAll("[data-board-cell]");
    return [...allCell].every((allCell) => {
      return (
        allCell.classList.contains("spaceTakenX") ||
        allCell.classList.contains("spaceTakenO")
      );
    });
  };

  // Check if space is taken and if winner exists
  const gameBoardContainer = document.querySelector("#game-board");
  gameBoardContainer.addEventListener("click", (event) => {
    if (event.target.innerHTML != "") return;

    playRound(this.event);

    if (checkWin(event.target.innerHTML)) {
      displayController.renderWinner(event.target.innerHTML);
      console.log("win");
    }
    if (checkDraw()) {
      console.log("draw!");
    }
  });

  return {
    outerArrayMap,
    innerArrayMap,
    checkWin,
    gameBoardArray,
    roundTracker,
  };
})();

// Render display
const displayController = (function () {
  const gameBoardContainer = document.querySelector("#game-board");
  const boardCell = document.createElement("div");
  const restartButton = document.querySelector(".restart-button");
  const playerTurn = document.getElementById("player-turn");

  const renderBoard = () => {
    for (let i = 0; i < 9; i++) {
      boardCell.setAttribute("data-board-cell", i);

      gameBoardContainer.insertAdjacentElement(
        "beforeend",
        boardCell.cloneNode(true)
      );
    }
  };

  const renderSelction = (playerName, event) => {
    event.target.innerHTML = playerName;
  };

  const renderTurn = (currentTurn) => {
    playerTurn.innerHTML = `Player ${currentTurn}'s turn`;
  };

  const renderWinner = (currentTurn) => {
    playerTurn.innerHTML = `Player ${currentTurn} Wins!`;
  };

  const restartGame = () => {
    restartButton.addEventListener("click", () => {
      const allBoardCells = gameBoardContainer.querySelectorAll("div");
      gameBoard.roundTracker = 1;

      allBoardCells.forEach((cell) => {
        cell.innerHTML = "";
        cell.className = "";

        gameBoard.gameBoardArray = gameBoard.gameBoardArray.map(() => [
          "",
          "",
          "",
        ]);

        renderTurn("X");
      });
    });
  };
  restartGame();
  renderBoard();
  return { renderBoard, renderSelction, renderTurn, renderWinner, restartGame };
})();
