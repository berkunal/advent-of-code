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

async function main() {
  const lines = await readLines()

  const matchedStrings = []
  for (const line of lines) {
    const regex = /mul\(\d+,\d+\)/g
    const found = line.match(regex)

    matchedStrings.push(...found)
  }

  let total = 0
  for (const mulString of matchedStrings) {
    const string = mulString.slice(4,-1)
    const [firstNumber, secondNumber] = string.split(',').map(Number)

    total += firstNumber * secondNumber
  }

  console.log(total)
}

main()
