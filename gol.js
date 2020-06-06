const fps = 5;
const cnvs = document.querySelector("#cnvs");
const ctx = cnvs.getContext("2d");
const cellsize = 20;
var cells = [...Array(cnvs.height/cellsize)].map(()=>[...Array(cnvs.width/cellsize)].map(()=>Math.random()>=.5));
const dirs = [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]; // i, j
setInterval(() => {
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    let nxtcells = cells.map((m, i)=>m.map((n, j)=>{
        if (cells[i][j])
            ctx.fillRect(j*cellsize, i*cellsize, cellsize, cellsize);
        return isAlive(i, j);
    }));
    cells = nxtcells;
}, 1000/fps);

function isAlive(i, j) {
    let neighbors = 0;
    for (dir of dirs) {
        if ((i+dir[0] < cells.length && i+dir[0] >= 0) && (j+dir[1] >= 0 && j+dir[1] < cells[0].length))
            neighbors += cells[i+dir[0]][j+dir[1]]
    }
    return (neighbors == 3 && cells[i][j] == 0) || ((neighbors == 2 || neighbors == 3) && cells[i][j] == 1)
}