const fs = require('fs');
const readline = require('readline');

async function main() {
  const fileStream = fs.createReadStream('./input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  const firstList = []
  const secondList = []
  
  for await (const line of rl) {
    const [first, second] = line.split('   ').map(Number)
    firstList.push(first)
    secondList.push(second)
  }

  console.log(firstList)
  console.log(secondList)

  firstList.sort((a, b) => a - b)
  secondList.sort((a, b) => a - b)

  let totalDistance = 0

  for (let i = 0; i < firstList.length; i++) {
    totalDistance += Math.abs(firstList[i] - secondList[i])
  }

  console.log(totalDistance)
}

main()
