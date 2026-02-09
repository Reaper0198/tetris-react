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

            const curBoard = boardRef.current;
            const curPiece = pieceRef.current;

            if(checkCollision(curBoard, curPiece.grid, curPiece.x_pos, (curPiece.y_pos + 1))){
                setPiece(prev => ({...prev, y_pos : (prev.y_pos + 1)}));
            }
            else{
                lockPieceInBoard(curBoard, curPiece);
                if(checkGameOver()){
                    console.log("--------GAME OVER---------")
                    clearInterval(intervalId);
                }else{
                    generateNewPiece();
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    // to handle user input on keyboard
    const handleKeyPress = (e) => {
        console.log(e.key);
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

    // add the piece into board array once it is placed
    const lockPieceInBoard = (board, piece) => {

        const finalBoard = board;

        piece.grid.map((row, y) => {
            row.map((cell, x) => {
                const piece_x = piece.x_pos + x;
                const piece_y = piece.y_pos + y;

                if(cell == 1){
                    finalBoard[piece_y][piece_x] = 1;
                }
            })
        })

        setBoard(finalBoard);
    }

    // generates new piece after prev is fixed into board
    const generateNewPiece = () => {
        const num = Math.floor(Math.random() * 7);
        console.log(num)
        const newPiece = {
            x_pos : 4,
            y_pos : 0
        }

        if(num == 0){ // L, I, S, O, T, Z, J
            setPiece({...newPiece, grid : I});
        }else if(num == 1){
            setPiece({...newPiece, grid : L});
        }else if(num == 2){
            setPiece({...newPiece, grid : J});
        }else if(num == 3){
            setPiece({...newPiece, grid : O});
        }else if(num == 4){
            setPiece({...newPiece, grid : S});
        }else if(num == 5){
            setPiece({...newPiece, grid : T});
        }else if(num == 6){
            setPiece({...newPiece, grid : Z});
        }
        // console.log("newPiece", piece);
    }

    // checks game over if the fixed pieces reached top row
    const checkGameOver = () => {
        if(checkCollision(board, piece.grid, piece.x_pos, piece.y_pos)){
            return false;
        }else{
            return true;
        }
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