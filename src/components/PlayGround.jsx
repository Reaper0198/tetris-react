import { useState } from "react"
import {checkCollision, L} from './block.js'

export default function PlayGround() {



    const initialPiece = {
        grid : L,
        x_pos : 4,
        y_pos : 0
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

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

    const handleKeyPress = (e) => {
        console.log(e.key);
        if(e.key === 'd'){
            if(checkCollision(board, piece.grid, (piece.x_pos + 1), (piece.y_pos))){
                setPiece(prev => ({ ...prev, x_pos : (prev.x_pos+1)}))
            }
        }else if(e.key === 'a'){
            if(checkCollision(board, piece.grid, (piece.x_pos - 1), (piece.y_pos))){
                setPiece(prev => ({ ...prev, x_pos : (prev.x_pos-1)}))
            }
        }else if(e.key === 's'){
            if(checkCollision(board, piece.grid, (piece.x_pos), (piece.y_pos + 1))){
                setPiece(prev => ({ ...prev, y_pos : (prev.y_pos+1)}))
            }
        }else if(e.key === 'w'){
            if(checkCollision(board, piece.grid, (piece.x_pos ), (piece.y_pos - 1))){
                setPiece(prev => ({ ...prev, y_pos : (prev.y_pos-1)}))
            }
        }
    }

    return (
        <>
            <div className="w-90 h-180 border grid grid-cols-10 m-2"
                onKeyDown={handleKeyPress} tabIndex={2}
            >
                {
                    board.map((row,rowIndex) => {
                        return (row.map((cell, cellIndex) => {
                            if(cell == 1){
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 bg-gray-700"></div>)
                            }else{
                                if((rowIndex - piece.y_pos) < piece.grid.length &&
                                    (cellIndex - piece.x_pos) < piece.grid[0].length && 
                                      (rowIndex - piece.y_pos) >= 0 && 
                                        (cellIndex - piece.x_pos) >= 0){
                                        if(piece.grid[rowIndex - piece.y_pos][cellIndex - piece.x_pos] == 1){
                                            return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 bg-amber-600"></div>)
                                        }
                                    }
                                }
                                return (<div key={`${rowIndex}-${cellIndex}`} className="w-8 h-8 bg-gray-500"></div>)
                        })
                    )})
                }
            
            </div>
        </>
    )
}