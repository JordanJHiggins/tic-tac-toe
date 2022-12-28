// modules
const name = "James";

const person = { first: name };

console.log(person);

const sayHelloLinting = (fName) => {
  console.log(`Hello linting, ${fName}`);
};





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
     let currentSelection =  gameBoardContainer.addEventListener("click", (event) => {
        let mapValue = event.target.getAttribute("data-board-cell");

        let outerArrayValue = gameBoardModule.outerArrayMap[mapValue];
        let innerArrayValue = gameBoardModule.innerArrayMap[mapValue];

        gameBoardModule.gameBoard.gameBoardArray[outerArrayValue].splice(
          innerArrayValue,
          1,
          playerName
        );
        event.target.innerHTML = playerName;
      });
    },
    renderPlayers: function () {},
  };

  return { displayController,  };
})();

const gameLogicModule = (function () {
  const gameLogic = {
    rounds: function () {},

    spaceTaken: function () {
      if (currentSelection)
    },
  };
})();

// player factory
const player = (playerName) => {
  const makeSelection = (playerName) =>
    displayControllerModule.displayController.renderSelction(playerName);

  return { makeSelection };
};
 
const playerOne = player();

playerOne.makeSelection("ox");

displayControllerModule.displayController.renderBoard();

