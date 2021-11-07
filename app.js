const SIZE_OF_FIELD = 4

const rows = document.querySelectorAll('.row')
const active = document.querySelector('.active')
const field = document.querySelector('.field')

document.addEventListener('keyup', game)

function game(event) {
  switch (event.key) {
    case 'ArrowDown':
      down()
      break
    case 'ArrowUp':
      up()
      break
  }
}

function getField() {
  let binField = []
  for (let i = 0; i < SIZE_OF_FIELD; i++) {
    binField.push([])
    for (let j = 0; j < SIZE_OF_FIELD; j++) {
      binField[i].push(isEmpty(i, j))
    }
  }
  return binField
}

function getActivePositions(binField) {
  let activePositions = []
  for (let i = 0; i < SIZE_OF_FIELD; i++) {
    for (let j = 0; j < SIZE_OF_FIELD; j++) {
      if (!binField[i][j]) {
        activePositions.push([i, j])
      }
    }
  }
  return activePositions
}

function down() {
  let binField = getField()
  const activePositions = getActivePositions(binField).reverse()
  for (position of activePositions) {
    const y = position[0]
    const x = position[1]
    let i = 1
    if (y !== SIZE_OF_FIELD - i || binField[y + 1][x]) {
      while (!binField[SIZE_OF_FIELD - i][x]) {
        i++ // TODO может быть бесконечный цикл.
      }
      const active = rows[y].querySelectorAll('.cell')[x].querySelector('.active')
      active.classList.add('move-right')
      active.style.transform = `translate(0, ${(SIZE_OF_FIELD - i - y) * 120}px)`
      setTimeout(() => repl(SIZE_OF_FIELD - i, active), 300)
      binField[y][x] = true
      binField[SIZE_OF_FIELD - i][x] = false
    }
  }
}

function up() {
  let binField = getField()
  const activePositions = getActivePositions(binField)
  for (position of activePositions) {
    const y = position[0]
    const x = position[1]
    let i = 0
    if (y !== 0 || binField[y - 1][x]) {
      while (!binField[i][x]) {
        i++ // TODO может быть бесконечный цикл.
      }
      const active = rows[y].querySelectorAll('.cell')[x].querySelector('.active')
      active.classList.add('move-right')
      active.style.transform = `translate(0, ${(i - y) * 120}px)`
      setTimeout(() => repl(i, active), 300)
      binField[y][x] = true
      binField[i][x] = false
    }
  }
}

function repl(position, active) {
  active.classList.remove('move-right')
  active.style.transform = `translate(0, 0)`
  rows[position].querySelector('.cell').append(active)
}

function isEmpty(y, x) {
  if (x < 0 || x >= SIZE_OF_FIELD || y < 0 || y >= SIZE_OF_FIELD) {
    return false
  }
  const cell = rows[y].querySelectorAll('.cell')[x].querySelector('.active')
  return cell === null
}
