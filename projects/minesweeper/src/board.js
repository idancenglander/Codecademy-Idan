export class Board {
  constructor(numberOfRows, numberOfColumns, numberofBombs) {
    this._numberOfBombs = numberofBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberofBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }
  //Add flipTile()
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] == 'B'){
       this._playerBoard[rowIndex][columnIndex] = 'B'
     } else {
       this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
     }
     this._numberOfTiles--;
   }
//Add getNumberOfNeighborBombs()
   getNumberOfNeighborBombs(rowIndex, columnIndex) {
     const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
     const numberOfRows = this._bombBoard.length;
     const numberOfColumns = this._bombBoard[0].length;
     let numberOfBombs = 0;
     neighborOffsets.forEach(offset => {
       const neighborRowIndex = rowIndex + offset[0];
       const neighborColumnIndex = columnIndex + offset[1];
       if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
         if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
           numberOfBombs++;
         }
       }
     });
     return numberOfBombs;
   };
//Check for safe tiles
   hasSafeTiles() {
     return this._numberOfTiles !== this._numberOfBombs;
   }
//print the board
   print() {
     console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
     console.log('Number of bombs = ' + this._numberOfBombs);
     console.log('Number of tiles = ' + this._numberOfTiles);
       console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
   }
   //Dynamically generate a player board

   static generatePlayerBoard(numberOfRows, numberOfColumns) {
     let board = [];
     for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
       let row = [];
       for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
         row.push(' ');
       }
       board.push(row);
     }
     return board;
   }
   //Dynamically generate a bomb board

   static generateBombBoard(numberOfRows, numberOfColumns, numberofBombs) {
     let board = [];
     for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
       let row = [];
       for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
         row.push(' ');
       }
       board.push(row);
     }
     //code to randomly add bombs
       let numberOfBombsPlaced = 0;
         while (numberOfBombsPlaced < numberofBombs) {
           let randomRowIndex = Math.floor(Math.random() * numberOfRows);
           let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
           if (board[randomRowIndex][randomColumnIndex] !== 'B') {
             board[randomRowIndex][randomColumnIndex] = 'B'; numberOfBombsPlaced++
           };
         }

       return board;
     }
}
