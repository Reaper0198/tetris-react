import { useEffect, useRef, useState } from "react"
import { initialBoard, initialPiece, L, I, S, O, T, Z, J, rotate90} from './block.js'
import { checkCollision, checkGameOver, checkLineClear, generateNewPiece, lockPieceInBoard, generateFinalBoardArray } from "./gameLogic.js";

export default function PlayGround() {

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