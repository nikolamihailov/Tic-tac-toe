const board = document.querySelector(".board");
const info = document.querySelector(".info");
const newGame = document.getElementById("newGame");

newGame.addEventListener("click", newGameF);
let cells = ["", "", "", "", "", "", "", "", ""];
let start = "circle";
function createBoard() {
    cells.forEach((value, index) => {
        let cellEl = document.createElement("div");
        cellEl.addEventListener("click", makeShape);
        cellEl.classList.add("cell");
        cellEl.id = index + 1;
        board.append(cellEl);
    })
}
let winningCombos = [[1, 2, 3], [7, 8, 9],
[4, 5, 6],
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[1, 5, 9],
[3, 5, 7]];
/*let winningCombos = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2],
[4, 5, 6], [4, 6, 5], [5, 6, 4], [5, 4, 6], [6, 5, 4], [6, 4, 5],
[1, 4, 7], [1, 7, 4], [4, 7, 1], [4, 1, 7], [7, 1, 4], [7, 4, 1],
[2, 5, 8], [2, 8, 5], [5, 2, 8], [5, 8, 2], [8, 2, 5], [8, 5, 2],
[3, 6, 9], [3, 9, 6], [6, 3, 9], [6, 9, 3], [9, 6, 3], [9, 3, 6],
[1, 5, 9], [1, 9, 5], [5, 9, 1], [5, 1, 9], [9, 5, 1], [9, 1, 5],
[3, 5, 7], [3, 7, 5], [5, 7, 3], [5, 3, 7], [7, 5, 3], [7, 3, 5]];*/
let ids = [];
function makeShape(e) {
    const el = document.createElement("div");
    if (start === "circle") {
        el.classList.add("circle");
        start = "cross";
    } else if (start === "cross") {
        el.classList.add("cross");
        start = "circle";
    }
    info.innerText = `${start} turn`;
    e.target.append(el);
    checkWin(e);

    e.target.removeEventListener("click", makeShape)
}
function checkWin(e) {
    let idsCircle = ids.slice();
    let idsCross = ids.slice();
    ids.push(Number(e.target.id));
    idsCircle = ids.filter((value, index) => index % 2 === 0);
    idsCross = ids.filter((value, index) => index % 2 !== 0);

    for (const winCombo of winningCombos) {
        if (idsCircle.toString().includes(`${winCombo[0].toString()}`)
            && idsCircle.toString().includes(`${winCombo[1].toString()}`)
            && idsCircle.toString().includes(`${winCombo[2].toString()}`)) {

            info.innerText = "Circle wins!!!";
            board.classList.add("win");
        }
        if (idsCross.toString().includes(`${winCombo[0].toString()}`)
            && idsCross.toString().includes(`${winCombo[1].toString()}`)
            && idsCross.toString().includes(`${winCombo[2].toString()}`)) {
            board.classList.add("win");
            info.innerText = "Cross wins!!!";
        }
    }
    // console.log(idsCircle);
    //console.log(idsCross);
}
info.innerText = "Circle turn";
createBoard();
const cellsElements = document.querySelectorAll(".cell");
console.log(cellsElements);

function newGameF() {
    board.classList.remove("win");
    while (board.firstChild) {
        board.removeChild(board.lastChild);
    }
    createBoard();
    start = "circle";
    info.innerText = "Circle turn";
}