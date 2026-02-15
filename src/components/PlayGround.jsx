import { useEffect, useRef, useState } from "react"
import { initialBoard, rotate90, generateNewPiece } from './block.js'
import { checkCollision, checkGameOver, checkLineClear, lockPieceInBoard, generateFinalBoardArray, getGhost_y, saveScore } from "./gameLogic.js";

export default function PlayGround({ level, increaseScoreBy, runGame, resetGame, score }) {

    const [board, setBoard] = useState(initialBoard);
    // used useRef hook to get latest value of board in game loop
    const boardRef = useRef(board);
    useEffect(() => {
        board.current = board;
    }, [board])

    const [piece, setPiece] = useState(generateNewPiece());
    // used useRef hook to get latest value of piece in game loop
    const pieceRef = useRef(piece);
    useEffect(() => {
        pieceRef.current = piece;
    }, [piece])

    const timeoutIdRef = useRef(null);
    const tickRef = useRef(1200);
    // this ref will hold the reference to actual playground element in the DOM
    const playGroundRef = useRef(null);
    const scoreRef = useRef(score);

    useEffect(() => {
        tickRef.current = Math.max(200, tickRef.current - 200);
        // console.log(tickRef.current);
    }, [level])

    useEffect(()=> {
        scoreRef.current = score;
    }, [score])

    useEffect(() => {
        setBoard(initialBoard);
        setPiece(generateNewPiece());
        tickRef.current = 1200;
        boardRef.current = initialBoard;
        pieceRef.current = piece;
        playGroundRef.current.focus();
    }, [resetGame])


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
        if (checkCollision(curBoard, curPiece.grid, curPiece.x_pos, (curPiece.y_pos + 1))) {
            setPiece(prev => ({ ...prev, y_pos: (prev.y_pos + 1) }));
        }
        else {
            let updatedBoard = lockPieceInBoard(curBoard, curPiece);
            const result = checkLineClear(updatedBoard);
            boardRef.current = result.newBoard;

            //increasing score on clearing rows
            if (result.removedRows == 1) {
                increaseScoreBy(100);
            } else if (result.removedRows == 2) {
                increaseScoreBy(225);
            } else if (result.removedRows == 3) {
                increaseScoreBy(350);
            } else if (result.removedRows == 4) {
                increaseScoreBy(500);
            }

            setBoard(boardRef.current);

            pieceRef.current = generateNewPiece();
            setPiece(pieceRef.current);

            if (checkGameOver(boardRef.current, pieceRef.current)) {
                console.log("--------GAME OVER---------")
                saveScore(scoreRef.current);
                console.log('runGame', runGame)
                return;
            }
        }

        timeoutIdRef.current = setTimeout(gameLoop, tickRef.current);

    }

    //game loop caller
    useEffect(() => {
        if(runGame && playGroundRef.current){
            playGroundRef.current.focus();
            gameLoop();
        }
        return () => clearTimeout(timeoutIdRef.current);
    }, [runGame]);

    // to handle user input on keyboard
    const handleKeyPress = (e) => {
        // console.log(e.key);
        if (runGame) {
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
            } else if (e.key === ' ') {
                // rotate piece 
                // wall kicks if rotated piece off by 1 unit on either side
                if (checkCollision(board, rotate90(piece.grid), piece.x_pos, piece.y_pos)) {
                    setPiece(prev => ({ ...prev, grid: (rotate90(prev.grid)) }))
                } else if (checkCollision(board, rotate90(piece.grid), (piece.x_pos - 1), piece.y_pos)) {
                    setPiece(prev => ({ ...prev, grid: (rotate90(prev.grid)), x_pos: (prev.x_pos - 1) }))
                }
            } else if (e.key === 'Shift') {
                const ghost_y = getGhost_y(board, piece);
                setPiece(prev => ({ ...prev, y_pos: ghost_y }))
            }
        }
    }

    const finalBoard = generateFinalBoardArray(board, piece);

    return (
        <>
            <div className="min-w-90 h-180 border grid grid-cols-10 m-2 p-2 outline-none"
                onKeyDown={handleKeyPress} 
                tabIndex={1}
                ref = {playGroundRef}
            >
                {
                    finalBoard.map((row, rowIndex) => {
                        return (row.map((cell, cellIndex) => {
                            if (cell === -1) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-300"></div>)
                            } else if (cell === 0) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-500"></div>)
                            } else if (cell === 1) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-amber-500"></div>)
                            } else if (cell === 2) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-purple-600"></div>)
                            } else if (cell === 3) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-yellow-300"></div>)
                            } else if (cell === 4) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-blue-600"></div>)
                            } else if (cell === 5) {
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