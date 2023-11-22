
function GameBoard(){
  const board = [];
  const SIZE = 3;
  
  for (let r = 0; r < SIZE; r++){
    const row = [];
    for (let c = 0; c < SIZE; c++){
      row.push(Cell());
    }
    board.push(row);
  }
  
  function displayBoard(){
    const output = board.map((row) => row.map((entry) => entry.getContent()));
    console.log(output);
  }
  
  //Row starts from top, column starts from left. (Top left is 0, 0);
  function setBoard(row, col, value){
    if (row >= 0 && row < SIZE && col >= 0 && col < SIZE){
      board[row][col].setContent(value);
    }
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
  
  return {displayBoard, setBoard, foundWinner};
}

function Cell(){
  let content = " ";
  const getContent  = () => content;
  const setContent = (input) => {
      content = input;
  }
  return {setContent, getContent};
}



const gameboard = GameBoard();