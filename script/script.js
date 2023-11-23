const SIZE = 3;

function GameSession(){
  const gameBoard = (function (){
    let board = [];
    let remainingSquare;
    init();
    
    function init(){
      board = [];
      remainingSquare = SIZE * SIZE;
      for (let r = 0; r < SIZE; r++){
        const row = [];
        for (let c = 0; c < SIZE; c++){
          row.push(Cell());
        }
        board.push(row);
      }
    }
    
    //Convert array of cells to array of markers
    function displayBoard(){
      const output = board.map((row) => row.map((entry) => entry.getContent()));
      console.log(output);
      return output;
    }
    
    //Row starts from top, column starts from left. (Top left is 0, 0). Return true if successful;
    function setBoard(row, col, value){
      if (row >= 0 && row < SIZE && col >= 0 && col < SIZE &&  board[row][col].getContent() === " "){
        board[row][col].setContent(value);
        remainingSquare--;
        return true;
      }
      return false;
    }
    
    //Returns true if marker exist SIZE times in a row, column or diagonal consecutively
    function foundWinner (marker){
      //Check winner in row or column
      for (let i = 0; i < SIZE; i++){
        let rowWin = true;
        let colWin = true;
        for (let j = 0; j < SIZE; j++){
            rowWin = rowWin && board[i][j].getContent() === marker;
            colWin = colWin && board[j][i].getContent() === marker;
        }
        if (rowWin || colWin){
          return true;
        }
      }
      
      //Check winner in diagonal
      let diaDownWin = true;
      let diaUpWin = true;
      for (let i = 0; i < SIZE; i++){
        diaDownWin = diaDownWin && board[i][i].getContent() === marker;
        diaUpWin = diaUpWin && board[SIZE-i-1][i].getContent() === marker;
      }
      return diaDownWin || diaUpWin;
    }
    
    //Check if there are any "empty" spaces left on the board
    function remainingSpace(){
      if (remainingSquare > 0){
        return true;
      }
    }
    
    return {displayBoard, setBoard, foundWinner, init, remainingSpace};
  })();
  
  const PLAYER_1_NAME = "Player 1";
  const PLAYER_2_NAME = "Player 2";
  const PLAYER_1_MARKER = "O";
  const PLAYER_2_MARKER = "X";
  let firstPlayerTurn = true;
  let message = "";
  let currBoard;
  init();
  
  function init(){
    gameBoard.init();
    message = `${PLAYER_1_NAME}'s turn.`;
    console.log(message);
    firstPlayerTurn = true;
    currBoard = gameBoard.displayBoard();
  }
  
  function playRound(row, col){
    if (gameBoard.foundWinner(PLAYER_1_MARKER) || gameBoard.foundWinner(PLAYER_2_MARKER)){
      message = "Please reset game.";
      console.log(message);
      return;
    }
    
    if (firstPlayerTurn){
      doMove (row, col, PLAYER_1_MARKER, PLAYER_1_NAME, PLAYER_2_NAME);
      return;
    }
    
    if (!firstPlayerTurn){
      doMove (row, col, PLAYER_2_MARKER, PLAYER_2_NAME, PLAYER_1_NAME);
      return;      
    }
  }
  
  function doMove(row, col, marker, playerName, nextPlayerName){
    const validMove = gameBoard.setBoard(row, col, marker);
    if (validMove && gameBoard.foundWinner(marker)){
      message = `${playerName} wins!`;
      console.log(message);
      currBoard = gameBoard.displayBoard();
      return;
    }
    
    if (validMove){
      message = `${nextPlayerName}'s turn.`;
      console.log(message);
      currBoard = gameBoard.displayBoard();
      firstPlayerTurn = !firstPlayerTurn;
    }
    
    if (!gameBoard.remainingSpace()){
      message = "Draw! Please reset game.";
      console.log(message);
    }
  }
  
  function getCurrBoard (){
    return currBoard;
  }
  
  function getMessage (){
    return message;
  }

  return {init, playRound, getMessage, getCurrBoard}; 
}


function Cell(){
  let content = " ";
  const getContent  = () => content;
  const setContent = (input) => {
      content = input;
  }
  return {setContent, getContent};
}

function ScreenController(){
  let session;
  
  const resetButton = document.querySelector(".reset-button");
  resetButton.addEventListener("click", () => {
    session.init();
    displayMessage();
    displayBoard();
  });
  
  const playRound = (e) => {
    session.playRound(e.target.dataset.row, e.target.dataset.col);
    displayMessage();
    displayBoard();
  };
  init();
  
  
  function init(){
    session = GameSession();
    displayMessage();
    displayBoard();
  }
  
  function displayBoard(){
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.textContent = "";
    
    for (let row = 0; row < SIZE; row++){
      for (let col = 0; col < SIZE; col++){
        const buttonCell = document.createElement("button");
        buttonCell.type = "button";
        buttonCell.classList.add("cell");
        buttonCell.dataset.row = row;
        buttonCell.dataset.col = col;
        gridContainer.appendChild(buttonCell);
        buttonCell.textContent = session.getCurrBoard()[row][col];
        buttonCell.addEventListener("click", playRound);
      }
    }
  }
  
  function displayMessage(){
    const messageBox = document.querySelector(".header-message");
    messageBox.textContent = session.getMessage();
  }

}

ScreenController();