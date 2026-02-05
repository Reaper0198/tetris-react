const rotate = {
    rotate90 : function(grid) {
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
    },
    
    rotate180 : function(grid) {
        const x = grid.length;
        let gridCopy = grid;
        let newGrid = [];
        for(let i = x-1;i>=0;i--){
            gridCopy[i].reverse();
            newGrid.push(gridCopy[i]);
        }
        return newGrid;
    },
    
    rotate270 : function(grid) {
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
}
function print(arr){
    for(let i = 0;i<arr.length;i++){
        console.log(arr[i]);
    }
}

const I = [[1, 1, 1, 1]]

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
                          
