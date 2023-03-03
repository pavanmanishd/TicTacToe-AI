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
document.getElementById("button").addEventListener("click",startGame,false)
startGame()
function startGame() {
    document.getElementsByClassName("end")[0].style.display = "none"
    origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // make every cell empty and add click event listener
    for (let i = 0; i < origBoard.length; i++) {
        cells[i].innerText = ''
        cells[i].style.removeProperty("background-color")
        cells[i].addEventListener("click", (event) => turn(event.target.id, humanPlayer), false)
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
    for (let [index, win] of winCombos.entries()){
        if (win.every(elem => playerOptions.indexOf(elem) > -1)) {
            gameWon = {index : index ,player : player}
            break
        }
    }
    return gameWon
}

function gameOver(gameWon){
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "blue" : "red"
    }
}