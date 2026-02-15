export const I = [[1, 1, 1, 1]]

export const L = [[0, 0, 2],
[2, 2, 2]]

export const S = [[0, 3, 3],
[3, 3, 0]]

export const T = [[4, 4, 4],
[0, 4, 0]]

export const O = [[5, 5],
[5, 5]]

export const Z = [[6, 6, 0],
[0, 6, 6]]

export const J = [[7, 0, 0],
[7, 7, 7]]

export const initialBoard =
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



export const rotate90 = (grid) => {
    const x = grid.length; // 4
    const y = grid[0].length; // 2

    let newGrid = [];

    for (let i = 0; i < y; i++) {
        let row = []
        for (let j = x - 1; j >= 0; j--) {
            // console.log(this.grid[j][i]);
            row.push(grid[j][i]);
        }
        // console.log(row);
        newGrid.push(row);
    }

    return newGrid;

}

// generates new piece after prev is fixed into board
export const generateNewPiece = () => {
    const num = Math.floor(Math.random() * 7);

    let newPiece = {
        x_pos : 3,
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
    return newPiece;
}

function print(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
export default {};

