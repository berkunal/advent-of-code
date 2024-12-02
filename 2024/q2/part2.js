const fs = require('fs');
const { get } = require('http');
const readline = require('readline');

function isSafe(level) {
  let safe = true
  let increasing

  for (let i = 0; i < level.length-1; i++) {
    //* Increase decrease logic implemented here
    //* If the level is not increasing or decreasing, then it is not safe but it is handled in the next block of code
    if (increasing === undefined && level[i] !== level[i + 1]) {
      increasing = level[i] < level[i + 1]
    } else if ((increasing && level[i] > level[i + 1]) || (!increasing && level[i] < level[i + 1])) {
      safe = false
      break
    }

    const diff = Math.abs(level[i] - level[i + 1])
    if ( diff > 3 || diff < 1 ) {
      safe = false
      break
    }
  }

  return safe
}

async function getLevels() {
  const fileStream = fs.createReadStream('./input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  const levels = []

  for await (const line of rl) {
    const level = line.split(' ').map(Number)
    levels.push(level)
  }

  return levels
}

function getSafeLevelCount(levels) {
  let safeLevelCount = 0

  for (const level of levels) {
    if (isSafe(level)) {
      safeLevelCount++
    }
  }
  
  return safeLevelCount
}

function getSafeLevelCount2(levels) {
  let safeLevelCount = 0

  for (const level of levels) {
    //* Safe without removing any element
    if (isSafe(level)) {
      safeLevelCount++
      continue
    }
    
    //* Try to remove each element and see if it is safe
    let tempLevel = [...level]
    for (let i = 0; i < level.length; i++) {
      tempLevel = [...level]
      tempLevel.splice(i, 1)
      // console.log(level + ' ' + tempLevel + ' ' + i ) 
      if (isSafe(tempLevel)) {
        safeLevelCount++
        break
      }
    }
  }

  return safeLevelCount
}

async function main() {
  const levels = await getLevels()

  console.log(getSafeLevelCount(levels))
  console.log(getSafeLevelCount2(levels))
}

main()