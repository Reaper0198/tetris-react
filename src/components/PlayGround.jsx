import { useEffect, useState } from "react"
import { checkCollision, L, I, S, O, T, Z, J } from './block.js'

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

    //     [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    const [board, setBoard] = useState(initialBoard);

    const [piece, setPiece] = useState(initialPiece);

    // gravity and game loop
    useEffect( ()=> {
        const intervalId = setInterval(()=> {
            if(checkCollision(board, piece.grid, piece.x_pos, (piece.y_pos + 1))){
                setPiece(prev => ({...prev, y_pos : (prev.y_pos + 1)}));
            }
            // else{
            //     lockPieceInBoard(board, piece);
            //     generateNewPiece();
            //     if(checkGameOver()){
            //         console.log("--------GAME OVER---------")
            //         clearInterval(intervalId);
            //     }
            // }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

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
        }
    }

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
        console.log("newPiece", piece);
    }

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
                onKeyDown={handleKeyPress} tabIndex={2}
            >
                {
                    finalBoard.map((row, rowIndex) => {
                        return (row.map((cell, cellIndex) => {
                            if (cell == 1) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-gray-700"></div>)
                            } else if (cell == 2) {
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 border bg-amber-600"></div>)
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