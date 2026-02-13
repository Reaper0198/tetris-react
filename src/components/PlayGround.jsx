import { useEffect, useRef, useState } from "react"
import { initialBoard, initialPiece, L, I, S, O, T, Z, J, rotate90} from './block.js'
import { checkCollision, checkGameOver, checkLineClear, generateNewPiece, lockPieceInBoard, generateFinalBoardArray, getGhost_y } from "./gameLogic.js";

export default function PlayGround({ level, increaseScoreBy, runGame }) {

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

    const timeoutIdRef = useRef(null);
    const tickRef = useRef(1200);
    
    useEffect(() => {
        tickRef.current = Math.max(200, tickRef.current-200);
        // console.log(tickRef.current);
    }, [level])


    // gravity and game loop
    const gameLoop = () => {
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
            const result =  checkLineClear(updatedBoard);
            boardRef.current = result.newBoard;

            //increasing score on clearing rows
            if(result.removedRows == 1){
                increaseScoreBy(100);
            }else if(result.removedRows == 2){
                increaseScoreBy(225);
            }else if(result.removedRows == 3){
                increaseScoreBy(350);
            }else if(result.removedRows == 4){
                increaseScoreBy(500);
            }
            
            setBoard(boardRef.current);

            pieceRef.current = generateNewPiece();
            setPiece(pieceRef.current);

            if(checkGameOver(boardRef.current, pieceRef.current)){
                console.log("--------GAME OVER---------")
                return;
            }
        }

        timeoutIdRef.current = setTimeout(gameLoop, tickRef.current); 

    }

    //game loop caller
    useEffect( ()=> {
        if(runGame){
            gameLoop();
        }
        return () => clearTimeout(timeoutIdRef.current);
    }, [runGame]);

    // to handle user input on keyboard
    const handleKeyPress = (e) => {
        // console.log(e.key);
        if (e.key === 'd') {
            // move right
            if (checkCollision(board, piece.grid, (piece.x_pos + 1), (piece.y_pos))) {
                setPiece(prev => ({ ...prev, x_pos: (prev.x_pos + 1) }))
            }
        } else if (e.key === 'a') {
            //move left
            if (checkCollision(board, piece.grid, (piece.x_pos - 1), (piece.y_pos))) {
                setPiece(prev => ({ ...prev, x_pos: (prev.x_pos - 1) }))
            }
        } else if (e.key === 's') {
            // move down
            if (checkCollision(board, piece.grid, (piece.x_pos), (piece.y_pos + 1))) {
                setPiece(prev => ({ ...prev, y_pos: (prev.y_pos + 1) }))
            }
        } else if (e.key === 'w') {
            // move up
            if (checkCollision(board, piece.grid, (piece.x_pos), (piece.y_pos - 1))) {
                setPiece(prev => ({ ...prev, y_pos: (prev.y_pos - 1) }))
            }
        }else if(e.key === ' '){
            // rotate piece 
            // wall kicks if rotated piece off by 1 unit on either side
            if(checkCollision(board, rotate90(piece.grid), piece.x_pos, piece.y_pos)){
                setPiece(prev => ({...prev, grid : (rotate90(prev.grid))}))
            }else if(checkCollision(board, rotate90(piece.grid), (piece.x_pos-1), piece.y_pos)){
                setPiece(prev => ({...prev, grid : (rotate90(prev.grid)), x_pos : (prev.x_pos-1)}))
            }
        }else if(e.key === 'Shift'){
            const ghost_y = getGhost_y(board, piece);
            setPiece(prev => ({...prev, y_pos : ghost_y}))
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
                            if(cell === -1){
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-300"></div>)
                            }else if(cell === 0){
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-500"></div>)
                            }else if (cell === 1) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-amber-500"></div>)
                            } else if (cell === 2) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-purple-600"></div>)
                            } else if (cell === 3) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-yellow-300"></div>)
                            }else if(cell === 4){
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-blue-600"></div>)
                            }else if (cell === 5) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-emerald-600"></div>)
                            } else if (cell === 6) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-fuchsia-400"></div>)
                            } else if (cell === 7) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-red-700"></div>)
                            }
                        })
                        )
                    })
                }

            </div>
        </>
    )
}