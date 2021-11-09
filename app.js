const SIZE_OF_FIELD = 4

const colors = ['#EEE4DA', '#EDE0C8', '#F2B179', '#F59563', '#F67C5F', '#F65E3B', '#EDCF72', '#EDCC61']

const rows = document.querySelectorAll('.row')
const board = document.querySelector('.board')

document.addEventListener('keyup', event => {
  move(event.key)
  createNewSquare()
})

createNewSquare()
createNewSquare()

function move(direction) {
  if (!direction.includes('Arrow')) {
    return
  }
  let actives = getActives()
  if (contains(['ArrowDown', 'ArrowRight'], direction)) {
    actives = actives.reverse()
  }
  for (currentCell of actives) {
    const emptyCells = getOtherEmptyCells(currentCell)
    const cells = contains(['ArrowRight', 'ArrowLeft'], direction) ?
                    currentCell.parentNode.querySelectorAll('.cell') : 
                    getElementsFromCol(currentCell)
    const index = findIndexByElem(cells, currentCell)
    let newIndex = index
    if (direction === 'ArrowRight' || direction === 'ArrowDown') {
      for (let i = index; i < cells.length; i++) {
        if (contains(emptyCells, cells[i])) {
          newIndex = i
        }
      }
    } else if (direction === 'ArrowLeft' || direction === 'ArrowUp') {
      for (let i = index; i >= 0; i--) {
        if (contains(emptyCells, cells[i])) {
          newIndex = i
        }
      }
    }
    if (index !== newIndex) {
      const active = currentCell.querySelector('.active')
      const oldActive = cells[newIndex].querySelector('.active')
      if (oldActive !== null) {
        oldActive.parentNode.removeChild(oldActive)
        const number = parseInt(active.innerHTML)
        active.innerHTML = `${number * 2}`
        const colorIndex = Math.round(Math.log(number) / Math.log(2))
        if (colorIndex > 1) {
          active.style.color = '#F9F6F2'
        }
        active.style.background = colors[colorIndex]
      }
      // animateMove(active, direction, index, newIndex)
      replaceElement(cells[newIndex], active)
      // Ошибка в том, что я сначала обрабатываю новый элемент, а затем уже перемещаю старый. чтобы исправить её, нужно собрать данные в массив и отдельно перемещать элементы из него
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
    square.innerHTML = '2'
    square.style.background = colors[0]
    if (getRandomNumber(0, 10) == 0) {
      square.style.background = colors[1]
      square.innerHTML = '4'
    }
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

function getOtherEmptyCells(element) {
  const allCells = getAllCells()
  return allCells.filter(cell => cell.querySelector('.active') === null ||
    cell.querySelector('.active').innerHTML === element.querySelector('.active').innerHTML)
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

function getElementsFromCol(element) {
  let elementsInCol = []
  const elementsInRow = element.parentNode.querySelectorAll('.cell')
  const index = findIndexByElem(elementsInRow, currentCell)
  for (row of rows) {
    const elementInCol = row.querySelectorAll('.cell')[index]
    elementsInCol.push(elementInCol)
  }
  return elementsInCol
}

function animateMove(element, direction, start, end) {
  let axis
  if (contains(['ArrowUp', 'ArrowDown'], direction)) {
    axis = 'Y'
  } else {
    axis = 'X'
  }
  element.style.transform = `translate${axis}(${(end - start) * 120}px)`
}

function replaceElement(newParent, element) {
  element.style.transform = 'translateX(0)'
  newParent.append(element)
}