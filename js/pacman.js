'use strict'
const PACMAN = 'PACMAN';
var PACMAN_IMG ='<img src="img/right.jpg"/>'



var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN_IMG
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodCollected++
    }
    if (nextCell === CHERRY) updateScore(10);


    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver(false);
            // renderCell(gPacman.location, EMPTY)
            return;
        } else {
            for (var i = 0; i < gGhosts.length; i++) {
                var ghost = gGhosts[i]
                if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
                    var deadGhost = gGhosts.splice(i, 1)[0]
                    deadGhosts.push(deadGhost)
                    // deadGhosts = [...deadGhost, ...deadGhosts]
                    return
                }


            }

        }
    }

    // if (nextCell === POWER_FOOD && gPacman.isSuper === true) return
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        renderGhosts()
        setTimeout(function () {
            gPacman.isSuper = false;
            renderGhosts()
            gGhosts = [...gGhosts, ...deadGhosts];
            deadGhosts = []
        }, 5000);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN_IMG;
    // update the dom
    renderCell(gPacman.location, PACMAN_IMG);
    if (gFoodCollected === gFoodCount) {
        gameOver(true);
        return
    }

}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
             PACMAN_IMG = '<img src="img/up.jpg"/>';
            break;
        case 'ArrowDown':
            nextLocation.i++;
             PACMAN_IMG = '<img src="img/down.jpg"/>';
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PACMAN_IMG = '<img src="img/left.jpg"/>';
            break;
        case 'ArrowRight':
            nextLocation.j++;
            PACMAN_IMG = '<img src="img/right.jpg"/>';
            break;
        default:
            return null;
    }
    return nextLocation;
}




