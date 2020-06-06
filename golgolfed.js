const cnvs = document.querySelector("#cnvs");
cnvs.width = screen.width;
cnvs.height = screen.height;
const ctx = cnvs.getContext("2d");
[fps, cellsize] = [5, 10];
var cells = [...Array(Math.floor(cnvs.height/cellsize))].map(()=>[...Array(Math.floor(cnvs.width/cellsize))].map(()=>Math.random()>=.5));
const dirs = [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
setInterval(() => {
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    cells = cells.map((m, i)=>m.map((n, j)=>{
        ctx.fillRect(j*cellsize, i*cellsize, cellsize*n, cellsize*n);
        return isAlive(i, j);
    }));
}, 1000/fps);
function isAlive(i, j) {
    let neighbors = dirs.map((d)=>(cells[i+d[0]] || [])[j+d[1]] || 0).reduce((x, y)=>x+y);
    return (neighbors == 3 && cells[i][j] == 0) || ((neighbors == 2 || neighbors == 3) && cells[i][j] == 1);
}