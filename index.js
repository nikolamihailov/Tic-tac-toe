const board = document.querySelector(".board");
const gameHeading = document.getElementById("gameHeading");
const info = document.querySelector(".info");
const legend = document.getElementById("legendB");
const legendInfo = document.getElementById("legendInfo");
const rulesAndFeatures = document.querySelector(".rulesFeatures")
const changeLanguage = document.getElementById("languageIcon");
const newGame = document.getElementById("newGame");
let xScore = document.getElementById("X");
let oScore = document.getElementById("O");
const winsO = document.querySelector(".scoreO");
const winsX = document.querySelector(".scoreX");
const clearScore = document.querySelector(".clearScore");
const winner = document.querySelector(".popup");
const closePopup = document.getElementById("closePopup");
const closeInfo = document.getElementById("closeInfo");
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

legend.addEventListener("click", () => {
    legendInfo.classList.remove("hidden");
});

changeLanguage.addEventListener("click", () => {
    //let src = (changeLanguage.src).substring(22);
    let src = changeLanguage.getAttribute('src');
    console.log(src);
    if (src === "flags/gb.png") {
        changeLanguage.src = "flags/bg.png";
        newGame.innerText = "New game";
        clearScore.innerText = "Clear scores";
        gameHeading.innerHTML = "Tic tac toe <br>multiplayer";
        winsO.innerText = "O's wins:";
        winsX.innerText = "X's wins:";
        rulesAndFeatures.innerHTML = `
        <h2 style="text-decoration: underline; margin: 0;">RULES FOR TIC-TAC-TOE</h2>
        <p>
            <b>1.</b>The game is played on a grid that's 3 squares by 3 squares.<br>

            <b>2.</b>You are O (red), your friend is X (blue). Players take turns putting their marks in empty
            squares.<br>

            <b>3.</b>The first player to get 3 of the marks in a row (horizontal, vertical or diagonally) is the
            winner.<br>

            <b>4.</b>When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in
            a tie.
            <br><br>
        </p>
        <h2 style="text-decoration: underline;margin: 0; text-transform: uppercase;">Game features</h2>
        <p><b>Scores</b> - each player gets 1 point for every win. Loss and draw are both 0 points. <br>
            <b>Clear scores</b> - sets the scores for both players to zero. <br>
            <b>Info</b> - as you can already tell because you are reading this, shows games rules and the
            features.
            <br>
            <b>Flags</b> - translates the whole game to bulgarian / english. <br>
            <b>New game</b> - creates new game, the board is cleared.
        </p>`
    } else {
        changeLanguage.src = "flags/gb.png";
        newGame.innerText = "Нова игра";
        clearScore.innerText = "Нулирай резултати";
        gameHeading.innerHTML = "Морски шах <br> за двама";
        winsO.innerText = "O победи:";
        winsX.innerText = "X победи:";
        rulesAndFeatures.innerHTML = `
        <h2 style="text-decoration: underline; margin: 0;"> ПРАВИЛА ЗА МОРСКИ ШАХ</h2>
        <p>
            <b>1.</b>Играта се играе на поле 3 на 3 квадратчета.<br>

            <b>2.</b>Единият игра е с O(червени), другият играч е с Х (сини). Ирачите се редуват, поставяйки своите фигури в квадратите.<br>

            <b>3.</b>Първият играч, който постави 3 еднакви фигури на ред, колона или диагонал, е победител.<br>

            <b>4.</b>Когато всички 9 полета са пълни и никой няма 3 еднакви фигури на ред, колона или диагонал, има равенство.
            <br><br>
        </p>
        <h2 style="text-decoration: underline;margin: 0; text-transform: uppercase;">Функции на играта</h2>
        <p><b>Резултати</b> - всеки играч взима по 1 точка на победа. Равенство и загуба са по 0 точки. <br>
            <b>Нулирай резултати</b> - нулира резултатите на дваматата играчи. <br>
            <b>Инфо</b> - както може да предположите, тъй като четете това, показва правилата и функциите на играта.
            <br>
            <b>Флагове</b> - превежда цялата игра на български / английски. <br>
            <b>Нова игра</b> - създава нова дъска, квадратите са празни.
        </p>`
    }

})
closePopup.addEventListener("click", () => {
    winner.classList.add("hidden");
});
closeInfo.addEventListener("click", () => {
    legendInfo.classList.add("closeLegend");
    legendInfo.classList.add("hidden");
});
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
        let src = changeLanguage.getAttribute('src');
        if (src === "flags/bg.png") {
            if (!winner.classList.contains("hidden")) {
                info.innerText = ""
            } else {
                winner.classList.remove("hidden");
                winMessage.innerText = "Равенство!!!\n Никой не печели!";
            }
        } else {
            if (!winner.classList.contains("hidden")) {
                info.innerText = ""
            } else {
                console.log(src);
                winner.classList.remove("hidden");
                winMessage.innerText = "It's a draw !!!\n Nobody wins!";
            }
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
            let src = changeLanguage.getAttribute('src');
            if (src === "flags/gb.png") {
                winMessage.innerText = "Кръговете печелят !!! \n Честито!";
            } else {
                winMessage.innerText = "Circle wins !!! \n Congrats!";
            }
            board.classList.add("win");
            oScoreN++;
            oScore.innerText = oScoreN;
        }
        if (idsCross.toString().includes(`${winCombo[0].toString()}`)
            && idsCross.toString().includes(`${winCombo[1].toString()}`)
            && idsCross.toString().includes(`${winCombo[2].toString()}`)) {
            board.classList.add("win");
            winner.classList.remove("hidden");
            let src = changeLanguage.getAttribute('src');
            if (src === "flags/gb.png") {
                winMessage.innerText = "Хиксовете печелят !!! \n Честито!";
            } else {
                winMessage.innerText = "Cross wins !!! \n Congrats!";
            }
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