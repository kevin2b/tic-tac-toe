
function GameSession(){
  const gameBoard = (function (){
    var board = [];
    const SIZE = 3;
    resetBoard();
    
    function resetBoard (){
      board = [];
      for (let r = 0; r < SIZE; r++){
        const row = [];
        for (let c = 0; c < SIZE; c++){
          row.push(Cell());
        }
        board.push(row);
      }
    }
    
    function displayBoard(){
      const output = board.map((row) => row.map((entry) => entry.getContent()));
      console.log(output);
    }
    
    //Row starts from top, column starts from left. (Top left is 0, 0). Return true if successful;
    function setBoard(row, col, value){
      if (row >= 0 && row < SIZE && col >= 0 && col < SIZE &&  board[row][col].getContent() === " "){
        board[row][col].setContent(value);
        return true;
      }
      return false;
    }
    
    //Returns true if marker exist SIZE times in a row, column or diagonal
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
    
    return {displayBoard, setBoard, foundWinner, resetBoard};
  })();
  
  const PLAYER_1_NAME = "Player 1";
  const PLAYER_2_NAME = "Player 2";
  const PLAYER_1_MARKER = "O";
  const PLAYER_2_MARKER = "X";
  let firstPlayerTurn = true;
  startGame();
  
  function startGame(){
    gameBoard.resetBoard();
    console.log(`${PLAYER_1_NAME}'s turn.`);
    gameBoard.displayBoard();
  }
  
  function playRound(row, col){
    if (gameBoard.foundWinner(PLAYER_1_MARKER) || gameBoard.foundWinner(PLAYER_2_MARKER)){
      console.log("Please start a new game");
      return;
    }
    
    if (firstPlayerTurn){
      const validMove = gameBoard.setBoard(row, col, PLAYER_1_MARKER);
      if (validMove && gameBoard.foundWinner(PLAYER_1_MARKER)){
        console.log(`${PLAYER_1_NAME} wins!`);
        gameBoard.displayBoard();
        return;
      }
      if (validMove){
        console.log(`${PLAYER_2_NAME}'s turn.`);
        gameBoard.displayBoard();
        firstPlayerTurn = !firstPlayerTurn;
        return;
      }
    }
    
    if (!firstPlayerTurn){
      const validMove = gameBoard.setBoard(row, col, PLAYER_2_MARKER);
      if (validMove && gameBoard.foundWinner(PLAYER_2_MARKER)){
        gameBoard.displayBoard();
        console.log(`${PLAYER_2_NAME} wins!`);
        return;
      }
      if (validMove){
        console.log(`${PLAYER_1_NAME}'s turn.`);
        gameBoard.displayBoard();
        firstPlayerTurn = !firstPlayerTurn;
        return;
      }
    }
  }

  return {startGame, playRound}; 
}


function Cell(){
  let content = " ";
  const getContent  = () => content;
  const setContent = (input) => {
      content = input;
  }
  return {setContent, getContent};
}



const g = GameSession();