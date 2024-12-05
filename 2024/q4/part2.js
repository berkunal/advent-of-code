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
  
  // * Upper left
  try {
    if (lines[i-2][j] === 'M' && lines[i-2][j-2] === 'S' && lines[i-1][j-1] === 'A' && lines[i][j-2] === 'S') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i-2][j] === 'S' && lines[i-2][j-2] === 'S' && lines[i-1][j-1] === 'A' && lines[i][j-2] === 'M') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  // * Lower right
  try {
    if (lines[i+2][j] === 'M' && lines[i+2][j+2] === 'S' && lines[i+1][j+1] === 'A' && lines[i][j+2] === 'S') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  try {
    if (lines[i+2][j] === 'S' && lines[i+2][j+2] === 'S' && lines[i+1][j+1] === 'A' && lines[i][j+2] === 'M') {
      diagonalCount++
    }
  } catch (e) {
    // ignored
  }

  return diagonalCount
}

async function main() {
  const lines = await readLines()

  let totalXMAS = 0

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]
      if (char === 'M') {
        const diagonalCount = getDiagonalCount(lines, i, j)

        totalXMAS += diagonalCount
      }
    }
  }

  console.log(totalXMAS)
}

main()
