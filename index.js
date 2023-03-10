const board = document.querySelector(".board");
const info = document.querySelector(".info");
const newGame = document.getElementById("newGame");
let xScore = document.getElementById("X");
let oScore = document.getElementById("O");
const clearScore = document.querySelector(".clearScore");
const winner = document.querySelector(".popup");
const closePopup = document.getElementById("close");
const winMessage = document.getElementById("message");
let xScoreN = Number(xScore.innerText);
let oScoreN = Number(oScore.innerText);

clearScore.addEventListener("click", () => {
    xScoreN = 0;
    oScoreN = 0;
    xScore.innerText = 0;
    oScore.innerText = 0;
});

newGame.addEventListener("click", newGameF);

closePopup.addEventListener("click", () => {
    winner.classList.add("hidden");
})
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

    e.target.append(el);
    checkWin(e);
    if (ids.length === 9 && !board.classList.contains("win")) {
        if (!winner.classList.contains("hidden")) {
            info.innerText = ""
        } else {
            winner.classList.remove("hidden");
            winMessage.innerText = "It's a draw!!!\n Nobody wins!";

            //setInterval(() => { winner.innerHTML = ""; winner.classList.add("hidden") }, 3000);
        }
    } else {
        if (!winner.classList.contains("hidden")) {
            info.innerText = ""
        } else {
            info.innerText = `${start}'s turn`;
        }
    }

    e.target.removeEventListener("click", makeShape)
}
function checkWin(e) {
    //let idsCircle = ids.slice();
    // let idsCross = ids.slice();
    ids.push(Number(e.target.id));
    let idsCircle = ids.filter((value, index) => index % 2 === 0);
    let idsCross = ids.filter((value, index) => index % 2 !== 0);

    for (const winCombo of winningCombos) {
        if (idsCircle.toString().includes(`${winCombo[0].toString()}`)
            && idsCircle.toString().includes(`${winCombo[1].toString()}`)
            && idsCircle.toString().includes(`${winCombo[2].toString()}`)) {
            //info.innerText = "Circle wins!!!";
            winner.classList.remove("hidden");
            winMessage.innerText = "Circle wins!!! \n Congrats!";
            //setInterval(() => { winner.innerHTML = ""; winner.classList.add("hidden") }, 3000);
            board.classList.add("win");
            oScoreN++;
            oScore.innerText = oScoreN;
        }
        if (idsCross.toString().includes(`${winCombo[0].toString()}`)
            && idsCross.toString().includes(`${winCombo[1].toString()}`)
            && idsCross.toString().includes(`${winCombo[2].toString()}`)) {
            board.classList.add("win");
            //info.innerText = "Cross wins!!!";
            winner.classList.remove("hidden");
            winMessage.innerText = "Cross wins!!!\n Congrats!";
            //setInterval(() => { winner.innerHTML = ""; winner.classList.add("hidden") }, 3000);
            xScoreN++;
            xScore.innerText = xScoreN;
        }
    }
    // console.log(idsCircle);
    //console.log(idsCross);
}

info.innerText = "Circle's turn";
createBoard();
const cellsElements = document.querySelectorAll(".cell");
console.log(cellsElements);

function newGameF() {
    winner.classList.add("hidden");
    board.classList.remove("win");
    removeAllChildren(board);
    createBoard();
    ids = [];
    start = "circle";
    info.innerText = "Circle's turn";
}

function removeAllChildren(element) {
    while (element.firstChild) {
        removeAllChildren(element.lastChild);
        element.removeChild(element.lastChild);
    }
}