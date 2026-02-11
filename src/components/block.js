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