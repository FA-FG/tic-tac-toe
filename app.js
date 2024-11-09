/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
/*-------------------------------- Functions --------------------------------*/

const render = () => {
  updateBoard()
  updateMessage()
}

const init = (event) => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}

const updateBoard = () => {
  board.forEach((element, index) => {
    squareEls[index].textContent = element
  })
}
const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `Its ${turn} turn`
  } else if (tie) {
    messageEl.textContent = "it's a tie, play again!"
  } else {
    messageEl.textContent = `congratulations! ${turn} is the winner!`
  }
}

const handleClick = (event) => {
  let index = event.target.id
  if (board[index] || winner || tie) {
    return
  }

  placePiece(index)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()

  // console.log(event.target)
}

const placePiece = (index) => {
  board[index] = turn
}

const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] === turn &&
      board[combo[1]] === turn &&
      board[combo[2]] === turn
    ) {
      winner = true
      return
    }
  })
}

const checkForTie = () => {
  if (winner || board.includes('')) {
    tie = false
  } else {
    tie = true
  }
}
const switchPlayerTurn = () => {
  if (!winner && !tie) {
    turn = turn === 'X' ? 'O' : 'X'
  }
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)
