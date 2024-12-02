const fs = require('fs');
const readline = require('readline');

async function main() {
  //* Populate the firstList and secondList
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

  const occurences = new Map()

  for (const element of secondList) {
    occurences.set(element, occurences.get(element) ? occurences.get(element) + 1 : 1)
  }

  let similarityScore = 0

  for (const element of firstList) {
     const occuredTimes = occurences.get(element) ? occurences.get(element) : 0

     similarityScore += element * occuredTimes
  }

  console.log(similarityScore)
}

main()
