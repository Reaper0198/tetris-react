import { useEffect, useRef, useState } from "react"
import { checkCollision, L, I, S, O, T, Z, J, rotate90} from './block.js'

export default function PlayGround() {

    const initialPiece = {
        grid: L,
        x_pos: 4,
        y_pos: 0
    }

    const initialBoard =
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

        // [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


    const [board, setBoard] = useState(initialBoard);
    // used useRef hook to get latest value of board in setInterval
    const boardRef = useRef(board);
    useEffect(() => {
        board.current = board;
    }, [board])
    
    const [piece, setPiece] = useState(initialPiece);
    // used useRef hook to get latest value of piece in setInterval
    const pieceRef = useRef(piece);
    useEffect(() => {
        pieceRef.current = piece;
    }, [piece])

    // gravity and game loop
    useEffect( ()=> {
        const intervalId = setInterval(()=> {
            
            // here useRef values are used so setInterval's callback func always reads
            // the latest values of board and piece
            // because callback func does not re-bind state variables
            // i.e. it will always use the value of board and piece given at the time of first call
            // so reading state variables become stale
            const curBoard = boardRef.current;
            const curPiece = pieceRef.current;

            //gravity
            if(checkCollision(curBoard, curPiece.grid, curPiece.x_pos, (curPiece.y_pos + 1))){
                setPiece(prev => ({...prev, y_pos : (prev.y_pos + 1)}));
            }
            else{
                let updatedBoard = lockPieceInBoard(curBoard, curPiece);
                boardRef.current = checkLineClear(updatedBoard);

                pieceRef.current = generateNewPiece();

                if(checkGameOver(boardRef.current, pieceRef.current)){
                    console.log("--------GAME OVER---------")
                    clearInterval(intervalId);
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    // to handle user input on keyboard
    const handleKeyPress = (e) => {
        // console.log(e.key);
        if (e.key === 'd') {
            if (checkCollision(board, piece.grid, (piece.x_pos + 1), (piece.y_pos))) {
                setPiece(prev => ({ ...prev, x_pos: (prev.x_pos + 1) }))
            }
        } else if (e.key === 'a') {
            if (checkCollision(board, piece.grid, (piece.x_pos - 1), (piece.y_pos))) {
                setPiece(prev => ({ ...prev, x_pos: (prev.x_pos - 1) }))
            }
        } else if (e.key === 's') {
            if (checkCollision(board, piece.grid, (piece.x_pos), (piece.y_pos + 1))) {
                setPiece(prev => ({ ...prev, y_pos: (prev.y_pos + 1) }))
            }
        } else if (e.key === 'w') {
            if (checkCollision(board, piece.grid, (piece.x_pos), (piece.y_pos - 1))) {
                setPiece(prev => ({ ...prev, y_pos: (prev.y_pos - 1) }))
            }
        }else if(e.key === ' '){
            if(checkCollision(board, rotate90(piece.grid), piece.x_pos, piece.y_pos)){
                setPiece(prev => ({...prev, grid : (rotate90(prev.grid))}))
            }
        }
    }

    // add the piece into board array once it is placed
    const lockPieceInBoard = (board, piece) => {

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

                if(cell == 1){
                    if(piece_x >= 0 && piece_x < 10 && piece_y >= 0 && piece_y < 20){
                        finalBoard[piece_y][piece_x] = 1;
                    }
                }
            })
        })
        return finalBoard;
    }

    // generates new piece after prev is fixed into board
    const generateNewPiece = () => {
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
        setPiece(newPiece);
        return newPiece;
    }

    // checks game over if the fixed pieces reached top row
    const checkGameOver = (board, piece) => {
        if(checkCollision(board, piece.grid, piece.x_pos, piece.y_pos)){
            return false;
        }else{
            return true;
        }
    }

    const checkLineClear = (board) => {

        const remainingRows = board.filter(row => row.reduce((tot, x) => tot+x, 0) !== 10);

        const removedRows = 20 - remainingRows.length;

        const emptyRows = [];

        for(let i = 0;i<removedRows;i++){
            emptyRows.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
        }

        const newBoard =  [...emptyRows, ...remainingRows];
        setBoard(newBoard);
        return newBoard;
    }

    // generate final board to render
    const generateFinalBoardArray = (board, piece) => {
        const finalBoard = board.map(row => [...row]);

        piece.grid.map((row, y) => {
            row.map((cell, x) => {
                if (cell === 1) {

                    const piece_x = piece.x_pos + x;
                    const piece_y = piece.y_pos + y;

                    if (piece_x >= 0 && piece_x < board[0].length &&
                        piece_y >= 0 && piece_y < board.length) {
                        finalBoard[piece_y][piece_x] = 2;
                    }
                }
            })
        })
        return finalBoard;
    }  

    const finalBoard = generateFinalBoardArray(board, piece);

    return (
        <>
            <div className="w-90 h-180 border grid grid-cols-10 m-2 p-2"
                onKeyDown={handleKeyPress} tabIndex={1}
            >
                {
                    finalBoard.map((row, rowIndex) => {
                        return (row.map((cell, cellIndex) => {
                            if (cell == 1) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-800"></div>)
                            } else if (cell == 2) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-purple-600"></div>)
                            } else if (cell == 0) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-500"></div>)
                            }
                        })
                        )
                    })
                }

            </div>
        </>
    )
}