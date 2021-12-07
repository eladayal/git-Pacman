'use strict'
const WALL = '⬛'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '⭐'
const CHERRY = '🍒'


var gFoodCount
var gFoodCollected;
var gBoard;
var gAddCherry;

var gGame = {
    score: 0,
    isOn: false
}


function init() {
    gFoodCount = 0
    gFoodCollected = 1;
    gGame.score = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gAddCherry = setInterval(addCherry, 15000);
    // console.table(gBoard)

    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 1 && j === 1 || i === 1 && j === 8 ||
                i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = POWER_FOOD;

            }

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (board[i][j] === FOOD) gFoodCount++
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}


function gameOver(isWin) {
    var elSpanOver = document.querySelector('.spanOver')
    var elModal = document.querySelector('.modal')

    elModal.style.display = 'block';
    clearInterval(gIntervalGhosts)
    clearInterval(gAddCherry)
    gGame.isOn = false;
    if (isWin) {

        elSpanOver.innerText = 'YOU WON!';
        // return;
    } else {
        elSpanOver.innerText = 'YOU LOST!';
        // return;
    }
}


function resetGame() {
    var elModal = document.querySelector('.modal')
    var elScore = document.querySelector('.score')
    init()
    elScore.innerText = 0;
    elModal.style.display = 'none';

}


function getAllEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];

            if (currCell === EMPTY) emptyCells.push({ i: i, j: j })
        }
    }
    return emptyCells
}
function addCherry() {
    var emptyCells = getAllEmptyCells()

    //2 - get a random index
    var randomIdx = getRandomInt(0, emptyCells.length - 1)

    //3 - get location from array
    var emptyCell = emptyCells[randomIdx];

    //4 - place a ball at location on gBoard (update model)
    gBoard[emptyCell.i][emptyCell.j] = CHERRY

    //5 - update ball at DOM
    renderCell(emptyCell, CHERRY)

}