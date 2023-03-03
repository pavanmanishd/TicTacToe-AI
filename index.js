let origBoard
const humanPlayer = "X"
const aiPlayer = "O"
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cells = document.getElementsByClassName("cell")
document.addEventListener("keypress", () => { document.getElementById("button").click() }, false)
document.getElementById("button").addEventListener("click", startGame, false)
startGame()
function startGame() {
    document.querySelector(".end").style.display = "none"
    document.getElementById("button").style.display = "none"
    origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // make every cell empty and add click event listener
    for (let i = 0; i < origBoard.length; i++) {
        cells[i].innerText = ''
        cells[i].style.removeProperty("background-color")
        cells[i].style.color = "white"
        cells[i].addEventListener("click", turnClick, false)
    }
//     turn(bestSpot(), aiPlayer)
}
function turnClick(event) {
    if (typeof origBoard[event.target.id] == "number") {
        turn(event.target.id, humanPlayer)
        setTimeout(() => {
            if (!checkTie() && !checkWinner(origBoard, humanPlayer)) turn(bestSpot(), aiPlayer)
        }, 150)
    }
}

function turn(id, player) {
    origBoard[id] = player
    document.getElementById(id).innerText = player
    //check gameWon
    let gameWon = checkWinner(origBoard, player)
    //if game won then run gameover screen
    if (gameWon) gameOver(gameWon)
}

function checkWinner(board, player) {
    let playerOptions = []
    let i = 0
    // push all the indices of the selected options of the given player to playerOptions
    board.map(e => {
        if (e === player) { playerOptions.push(i) }
        i++
    })

    let gameWon = null
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => playerOptions.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player }
            break
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "#BAD7E9" : "#EB455F"
        document.getElementById(index).style.color = gameWon.player == humanPlayer ? "#EB455F" : "#BAD7E9"
    }
    for (let i = 0; i < origBoard.length; i++) {
        cells[i].removeEventListener("click", turnClick, false)
    }
    document.getElementById("button").style.display = "block"
    declareWinner(gameWon.player == humanPlayer ? "You Win!" : "You Lose...")
}

function declareWinner(player) {
    document.querySelector(".end").style.display = "block";
    document.querySelector(".end .text").innerText = player;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == "number")
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index
}

function checkTie() {
        if (emptySquares().length == 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "#BAD7E9";
                cells[i].removeEventListener("click", turnClick, false);
            }
            declareWinner("Tie Game!")
            return true;
        }
        return false;
}

function minimax(newBoard, player){
    let availableSpots = emptySquares(newBoard)

    if(checkWinner(newBoard,humanPlayer)){
        return {score : -10}
    }
    else if(checkWinner(newBoard,aiPlayer)){
        return {score : 10}
    }
    else if(availableSpots.length === 0){
        return {score : 0}
    }

    let moves = []
    for(let i=0;i<availableSpots.length;i++){
        let move = {}
        move.index = newBoard[availableSpots[i]]
        newBoard[availableSpots[i]] = player

        if(player == humanPlayer){
            let result = minimax(newBoard, aiPlayer)
            move.score = result.score
        }
        else {
            let result = minimax(newBoard, humanPlayer)
            move.score = result.score
        }

        newBoard[availableSpots[i]] = move.index
        moves.push(move)
    }

    let bestMove
    if(player === aiPlayer){
        bestScore = -10000
        for(let i = 0;i<moves.length;i++){
            if(bestScore < moves[i].score){
                bestScore = moves[i].score
                bestMove = i
            }
        }
    }
    else{
        bestScore = 10000
        for(let i=0;i<moves.length;i++){
            if(bestScore>moves[i].score){
                bestScore = moves[i].score
                bestMove = i
            }
        }
    }
    return moves[bestMove]
}
