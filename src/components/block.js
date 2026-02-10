export const I = [[1, 1, 1, 1]]

export const L = [[0, 0, 1],
[1, 1, 1]]

export const S = [[0, 1, 1],
[1, 1, 0]]

export const T = [[1, 1, 1],
[0, 1, 0]]

export const O = [[1, 1],
[1, 1]]

export const Z = [[1, 1, 0],
[0, 1, 1]]

export const J = [[1, 0, 0],
[1, 1, 1]]

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

export const initialPiece = {
        grid: L,
        x_pos: 4,
        y_pos: 0
    }

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

function print(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
export default {};