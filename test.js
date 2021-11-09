const SIZE_OF_FIELD = 4

const a = [1, 2, 3]

const rows = document.querySelectorAll('.row')
const board = document.querySelector('.board')

document.addEventListener('keyup', event => {
  move(event.key)
  createNewSquare()
})

createNewSquare()

function move(direction) {
  const actives = getActives()
  const emptyCells = getEmptyCells()
  if (direction === 'ArrowRight') {
    for (currentCell of actives) {
      const cells = currentCell.parentNode.querySelectorAll('.cell')
      const index = findIndexByElem(cells, currentCell)
      for (let i = index + 1; i < cells.length; i++) {
        if (contains(emptyCells, cells[i])) {
          const active = currentCell.querySelector('.active')
          cells[i].append(active)
          break
        }
      }
    }
  }
}

function finishGame() {

}

function createNewSquare() {
  const emptyCells = getEmptyCells()
  if (emptyCells.length === 0) {
    finishGame()
  } else {
    const index = getRandomNumber(0, emptyCells.length)
    const square = document.createElement('div')
    square.classList.add('active')
    emptyCells[index].append(square)
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getCell(rowID, colID) {
  return rows[rowID].querySelectorAll('.cell')[colID]
}

function getAllCells() {
  const allCells = []
  for (row of rows) {
    const cells = row.querySelectorAll('.cell')
    for (cell of cells) {
      allCells.push(cell)
    }
  }
  return allCells
}

function getEmptyCells() {
  const allCells = getAllCells()
  return allCells.filter(cell => cell.querySelector('.active') === null)
}

function getActives() {
  const allCells = getAllCells()
  return allCells.filter(cell => cell.querySelector('.active') !== null)
}

function findIndexByElem(nodeList, element) {
  let index
  nodeList.forEach((item, i) => item == element ? index = i : 0);
  return index
}

function contains(arr, element) {
  return arr.indexOf(element) !== -1
}