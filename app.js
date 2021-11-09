const SIZE_OF_FIELD = 4

const rows = document.querySelectorAll('.row')
const active = document.querySelector('.active')
const field = document.querySelector('.field')

document.addEventListener('keyup', game)

function game(event) {
  switch (event.key) {
    case 'ArrowUp':
      verticalMove('up')
      break
    case 'ArrowDown':
      verticalMove('down')
      break
    case 'ArrowLeft':
      horizontalMove('left')
      break
    case 'ArrowRight':
      horizontalMove('right')
      break
  }
  generateNewActive()
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

function verticalMove(direction) {
  let binField = getField()
  let activePositions = getActivePositions(binField)
  let step, startValue
  switch (direction) {
    case 'up':
      startValue = 0
      step = 1
      break;
    case 'down':
      startValue = SIZE_OF_FIELD - 1
      step = -1
      activePositions = activePositions.reverse()
      break;
    default:
      return;
  }
  for (position of activePositions) {
    const y = position[0]
    const x = position[1]
    let i = startValue // может быть Y ом
    if (y !== startValue || !binField[y + step][x]) {
      while (!binField[i][x]) {
         i += step // TODO может быть бесконечный цикл.
      }
      const active = rows[y].querySelectorAll('.cell')[x].querySelector('.active')
      active.style.transform = `translateY(${(i - y) * 120}px)`
      setTimeout(() => repl(i, active, x), 300)
      binField[y][x] = true
      binField[i][x] = false
    }
  }
}

function horizontalMove(direction) {
  let binField = getField()
  let activePositions = getActivePositions(binField)
  let step, startValue
  if (direction === 'left') {
    startValue = 0
    step = 1
  } else if (direction === 'right') {
    startValue = SIZE_OF_FIELD - 1
    step = -1
    activePositions = activePositions.reverse()
  } else {
    return
  }
  for (position of activePositions) {
    const y = position[0]
    const x = position[1]
    let i = startValue
    if (x !== startValue || !binField[y][x + step]) {
      while (!binField[y][i]) {
         i += step // TODO может быть бесконечный цикл.
      }
      const active = rows[y].querySelectorAll('.cell')[x].querySelector('.active')
      active.style.transform = `translateX(${(i - x) * 120}px)`
      setTimeout(() => repl(y, active, i), 300)
      binField[y][x] = true
      binField[y][i] = false
    }
  }
}

function generateNewActive() {
  const binField = getField()
  console.log(_.countBy(['foo', 'foo', 'bar', 'bon'])['foo'])
}

function repl(position, active, x) {
  active.style.transform = `translate(0, 0)`
  rows[position].querySelectorAll('.cell')[x].append(active)
}

function isEmpty(y, x) {
  if (x < 0 || x >= SIZE_OF_FIELD || y < 0 || y >= SIZE_OF_FIELD) {
    return false
  }
  const cell = rows[y].querySelectorAll('.cell')[x].querySelector('.active')
  return cell === null // TODO contains
}
