const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageText = document.querySelector(
  '[data-winning-message-text]'
);
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');

let isCircleTurn;

const winningCombinations = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];


//começar game
const startGame = () => {
  isCircleTurn = false;

    for (const cell of cellElements)  {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true });
    };

  
    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message")
};


//finalizar jogo
const endGame = (isDraw) => {
   if (isDraw) {
     winningMessageText.innerText = "Empate!"
   } else {
    winningMessageText.innerText = isCircleTurn 
    ? 'Circulo venceu!' 
    : 'X venceu!'
   };
   winningMessage.classList.add("show-winning-message")
};



//checar vitoria
const checkForWin = (currentplayer) => {
   return winningCombinations.some(combination => {
     return combination.every(index => {
      return cellElements[index].classList.contains(currentplayer);
     });
  });
};

//checar empate
const  checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    });
};


//marcar
const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add('circle')
  } else {
    board.classList.add('x')
  };
}

//trocar turnos
const swapTurns = () =>{
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
    //colocar a marca ( x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';
     
    placeMark(cell, classToAdd);


    //checar vitoria 
     const isWin = checkForWin(classToAdd);

     //checar empate
     const isDraw = checkForDraw();

     if (isWin) {
        endGame(false)
     } else if (isDraw) {
        endGame(true)
     } else {
     //mudar simbolo/turno
        swapTurns();
     }; 
};

startGame();

//reiniciar o jogo
restartButton.addEventListener("click", startGame)