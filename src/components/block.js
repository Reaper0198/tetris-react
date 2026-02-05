    const board = 
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
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

// one for all
// this function checks if a piece at give coordinate is valid or not
// x is x-axis, y is y-axis
// all coordiates are in 4 quadrant
function checkCollision(board, piece, loc_x, loc_y){
    if(loc_x < 0){ // left boundry check
        return false;
    }

    if(loc_x > (10-x_length)){// right boundry check
        return false;
    }

    if(loc_y > 19){ // botton boundry check
        return false;
    }

    const x_length = piece[0].length;
    const y_length = piece.length;

    for(let i = 0;i<y_length;i++){
        for(let j = 0; j<x_length;j++){
            if(piece[i][j] == 1){
                if(board[loc_y+i][loc_x + j]=== 1){
                    return false;
                }
            }
        }
    }
    return true;
}

const rotate90 = (grid) => {
    const x = grid.length; // 4
    const y = grid[0].length; // 2
    
    let newGrid = [];
    
    for(let i = 0;i < y;i++){
        let row = []
        for(let j = x-1;j>= 0;j--){
            // console.log(this.grid[j][i]);
            row.push(grid[j][i]);
        }
        // console.log(row);
        newGrid.push(row);
    }
    
    return newGrid;
}

const rotate180= (grid) => {
    const x = grid.length;
    let gridCopy = grid;
    let newGrid = [];
    for(let i = x-1;i>=0;i--){
        gridCopy[i].reverse();
        newGrid.push(gridCopy[i]);
    }
    return newGrid;
}

const rotate270= (grid) => {
    const x = grid.length;
    const y = grid[0].length;
    
    newGrid = [];
    for(let i = 0;i<y;i++){
        let row = [];
        for(let j = 0;j<x;j++){
            row.push(grid[j][i]);
        }
        newGrid.push(row);
    }
    return newGrid;
}


function print(arr){
    for(let i = 0;i<arr.length;i++){
        console.log(arr[i]);
    }
}

const I = [[1], [1], [1], [1]]

const L =  [[1, 0],
            [1, 0],
            [1, 0],
            [1, 1]]
            
const S =  [[0, 1, 1],
            [1, 1, 0]]
            
const T =  [[1, 1, 1],
            [0, 1, 0]]

const O =  [[1, 1],
            [1, 1]]
            
const Z =  [[1, 1, 0],
            [0, 1, 1]]

const J =  [[0, 1],
            [0, 1],
            [0, 1],
            [1, 1]]
                          