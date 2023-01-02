const player = (playerName) => {
  const getName = () => playerName;

  return { getName };
};

// Game board
const gameBoardModule = (function () {
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
  // const allCell = document.querySelectorAll("[data-board-cell]");
  let roundTracker = 1;

  const playerMove = (playerName, containerEvent) => {
    let mapValue = containerEvent.target.getAttribute("data-board-cell");
    let outerArrayValue = outerArrayMap[mapValue];
    let innerArrayValue = innerArrayMap[mapValue];

    gameBoardArray[outerArrayValue].splice(innerArrayValue, 1, playerName);
    displayController.renderSelction(playerName, containerEvent);
  };

  const playRound = (containerEvent) => {
    if (roundTracker % 2 === 0) {
      containerEvent.target.classList.add("spaceTakenO");

      playerMove(playerTwo.getName(), containerEvent);
      displayController.renderTurn(playerOne.getName());

      roundTracker++;
    } else {
      containerEvent.target.classList.add("spaceTakenX");

      playerMove(playerOne.getName(), containerEvent);
      displayController.renderTurn(playerTwo.getName());

      roundTracker++;
    }
  };

  const checkWin = () => {
    const allCell = document.querySelectorAll("[data-board-cell]");
    return winCombo.some((combination) => {
      return combination.every((index) => {
        return allCell[index].classList.contains(
          "spaceTakenX" || "spaceTakenO"
        );
      });
    });
  };

  // Check if space is taken and if winner exists
  const gameBoardContainer = document.querySelector("#game-board");
  gameBoardContainer.addEventListener("click", (event) => {
    if (event.target.innerHTML != "") return;
    playRound(this.event);
    if (checkWin()) {
      displayController.renderWinner(event.target.innerHTML);
      console.log("win");
    }
  });

  return { outerArrayMap, innerArrayMap, checkWin };
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

  restartButton.addEventListener("click", () => {
    const allBoardCells = gameBoardContainer.querySelectorAll("div");

    allBoardCells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });

  renderBoard();
  return { renderBoard, renderSelction, renderTurn, renderWinner };
})();
