import { L, I, S, Z, T, O, J} from "./block.js"

// this function checks if a piece at give coordinate is valid or not
// all coordiates are in 4th quadrant
export const checkCollision = (board, piece, loc_x, loc_y) => {
    const x_length = piece[0].length;
    const y_length = piece.length;


    if (loc_x < 0) { // left boundry check
        return false;
    }

    if (loc_x > (10 - x_length)) {// right boundry check
        return false;
    }
    // console.log("before loc_y check")
    if (loc_y > (20 - y_length)) { // botton boundry check
        // console.log("inside loc_y check")
        return false;
    }

    if (loc_y < 0) { // top boundry check
        return false;
    }

    for (let i = 0; i < y_length; i++) {
        for (let j = 0; j < x_length; j++) {
            if (piece[i][j] !== 0) {
                
                if (board[loc_y + i][loc_x + j] > 0) {
                    // console.log("y ", (loc_y))
                    // console.log("x ", (loc_x + j))
                    return false;
                }
            }
        }
    }
    return true;
}

// add the piece into board array once it is placed
export const lockPieceInBoard = (board, piece) => {

    const finalBoard = [];
    board.forEach(row => {
        const rowCopy = [];
        row.forEach(cell => {
            rowCopy.push(cell);
        })
        finalBoard.push(rowCopy);
    })

    piece.grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            const piece_x = piece.x_pos + x;
            const piece_y = piece.y_pos + y;

            if(cell !== 0){
                if(piece_x >= 0 && piece_x < 10 && piece_y >= 0 && piece_y < 20){
                    finalBoard[piece_y][piece_x] = cell;
                }
            }
        })
    })
    return finalBoard;
}

// generates new piece after prev is fixed into board
export const generateNewPiece = () => {
    const num = Math.floor(Math.random() * 7);
    // console.log(num)
    let newPiece = {
        x_pos : 4,
        y_pos : 0
    }

    if(num == 0){ // L, I, S, O, T, Z, J
        newPiece = {...newPiece, grid : I};
    }else if(num == 1){
        newPiece = {...newPiece, grid : L};
    }else if(num == 2){
        newPiece = {...newPiece, grid : J};
    }else if(num == 3){
        newPiece = {...newPiece, grid : O};
    }else if(num == 4){
        newPiece = {...newPiece, grid : S};
    }else if(num == 5){
        newPiece = {...newPiece, grid : T};
    }else if(num == 6){
        newPiece = {...newPiece, grid : Z};
    }
    // console.log("newPiece", piece);
    return newPiece;
}

// checks game over if the fixed pieces reached top row
export const checkGameOver = (board, piece) => {
    if(checkCollision(board, piece.grid, piece.x_pos, piece.y_pos)){
        return false;
    }else{
        return true;
    }
}

//checks if board contain any fully filled rows and clears them
export const checkLineClear = (board) => {

    const remainingRows = board.filter(row => row.some(cell => cell === 0));

    const removedRows = 20 - remainingRows.length;

    const emptyRows = [];

    for(let i = 0;i<removedRows;i++){
        emptyRows.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    }

    const newBoard =  [...emptyRows, ...remainingRows];

    return {newBoard, removedRows}
}

// generate final board to render
export const generateFinalBoardArray = (board, piece) => {
    const finalBoard = board.map(row => [...row]);
    // console.log(piece);

    const ghost_y = getGhost_y(board, piece);

    piece.grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell !== 0) {

                const piece_x = piece.x_pos + x;
                const piece_y = piece.y_pos + y;

                const ghostPiece_y = ghost_y + y;

                if (piece_x >= 0 && piece_x < board[0].length &&
                    ghostPiece_y >= 0 && ghostPiece_y < board.length) {
                    finalBoard[ghostPiece_y][piece_x] = -1;
                }
                if (piece_x >= 0 && piece_x < board[0].length &&
                    piece_y >= 0 && piece_y < board.length) {
                    finalBoard[piece_y][piece_x] = cell;
                }
            }
        })
    })
    return finalBoard;
}  

export const getGhost_y = (board, piece) => {
    const pieceLen = piece.grid.length;
    let ghost_y = 0;
    // console.log(piece); 
    while(checkCollision(board, piece.grid, piece.x_pos, ghost_y)){
        ghost_y++;
    }

    return ghost_y-1;

}

const compare = (a, b) =>{
    if(a.score < b.score){
        return 1;
    }else{
        return -1;
    }
}

export const saveScore = (score) => {
    // console.log("score ", score);
    const newEntry = {
        date : new Date().toLocaleDateString('en-GB'),
        name : 'Tim',
        score
    }
    // console.log("newEntry ", newEntry);
    if(localStorage.getItem('lowestHighScore')){
        let lowestHighScore = JSON.parse(localStorage.getItem('lowestHighScore'));
        let recordArr = JSON.parse(localStorage.getItem('highScores'));
        recordArr.push(newEntry);
        recordArr.sort(compare);
        if(recordArr.length > 10){
            recordArr.splice(10, 1);
        }
        // console.log("recordArr ", recordArr);
        localStorage.setItem("highScores", JSON.stringify(recordArr));
        lowestHighScore = recordArr.at(-1).score;
        localStorage.setItem('lowestHighScore', JSON.stringify(lowestHighScore));
        // console.log('lowestHighScore ', lowestHighScore );
        
    }else{  
        localStorage.setItem("lowestHighScore", JSON.stringify(score));
        localStorage.setItem("highScores", JSON.stringify([newEntry]))
    }
}
