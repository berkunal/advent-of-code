const fs = require('fs');
const readline = require('readline');

async function readLines() {
  const fileStream = fs.createReadStream('./input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  const lines = []

  for await (const line of rl) {
    lines.push(line)
  }

  return lines
}

function getDiagonalCount(lines, i, j) {
  let diagonalCount = 0
  
  try {
    if (lines[i+1][j+1] === 'M' && lines[i+2][j+2] === 'A' && lines[i+3][j+3] === 'S') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i-1][j-1] === 'M' && lines[i-2][j-2] === 'A' && lines[i-3][j-3] === 'S') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i+1][j-1] === 'M' && lines[i+2][j-2] === 'A' && lines[i+3][j-3] === 'S') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i-1][j+1] === 'M' && lines[i-2][j+2] === 'A' && lines[i-3][j+3] === 'S') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  return diagonalCount
}

function getVerticalCount(lines, i, j) {
  let verticalCount = 0

  try {
    if (lines[i+1][j] === 'M' && lines[i+2][j] === 'A' && lines[i+3][j] === 'S') {
      verticalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i-1][j] === 'M' && lines[i-2][j] === 'A' && lines[i-3][j] === 'S') {
      verticalCount++
    }
  } catch (e) {
    // ignored
  }

  return verticalCount
}

function getHorizontalCount(lines, i, j) {
  let horizontalCount = 0

  try {
    if (lines[i][j+1] === 'M' && lines[i][j+2] === 'A' && lines[i][j+3] === 'S') {
      horizontalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i][j-1] === 'M' && lines[i][j-2] === 'A' && lines[i][j-3] === 'S') {
      horizontalCount++
    }
  } catch (e) {
    // ignored
  }

  return horizontalCount
}

async function main() {
  const lines = await readLines()

  let totalXMAS = 0

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]
      if (char === 'X') {
        const diagonalCount = getDiagonalCount(lines, i, j)
        const verticalCount = getVerticalCount(lines, i, j)
        const horizontalCount = getHorizontalCount(lines, i, j)

        totalXMAS += diagonalCount + verticalCount + horizontalCount
      }
    }
  }

  console.log(totalXMAS)
}

main()
