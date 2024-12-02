const fs = require('fs');
const readline = require('readline');

async function main() {
  //* Populate the levels
  const fileStream = fs.createReadStream('./input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  const levels = []
  const debugLevels = []

  for await (const line of rl) {
    const level = line.split(' ').map(Number)
    levels.push(level)
  }

  let safeLevelCount = 0

  for (const level of levels) {
    let safe = true
    let increasing
    for (let i = 0; i < level.length-1; i++) {
      if (increasing === undefined) {
        increasing = level[i] < level[i + 1]
      } else {
        if (increasing && level[i] > level[i + 1]) {
          safe = false
          break
        } else if (!increasing && level[i] < level[i + 1]) {
          safe = false
          break
        }
      }

      const diff = Math.abs(level[i] - level[i + 1])
      if ( diff > 3 || diff < 1 ) {
        safe = false
        break
      }
    }

    if (safe) {
      safeLevelCount++
      debugLevels.push(level)
    }
  }

  console.log(debugLevels)
  console.log(safeLevelCount)
}

main()
