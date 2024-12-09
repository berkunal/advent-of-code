const fs = require('fs');
const readline = require('readline');

async function readLines() {
  const fileStream = fs.createReadStream('./input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  const rules = []
  const pages = []
  let isPage = false

  for await (const line of rl) {
    if (!isPage) {
      if (line === '') {
        isPage = true
        continue
      }
      rules.push(line)
    } else {
      pages.push(line)
    }
  }

  return { rules, pages }
}

function createRuleMap(rules) {
  const ruleMap = new Map()

  for (const rule of rules) {
    const [key, value] = rule.split('|')
    if (ruleMap.has(key)) {
      ruleMap.set(key, [...ruleMap.get(key), value])
    } else {
      ruleMap.set(key, [value])
    }
  }

  return ruleMap
}

function getIncorrectlyOrderedPages(pages, ruleMap) {
  const incorrectlyOrderedPages = [];

  // find pages that are correctly ordered
  for (const page of pages) {
    const pageChars = page.split(',');
    let isCorrectlyOrdered = true;

    for (let i = 0; i < pageChars.length; i++) {
      const char = pageChars[i];
      const rule = ruleMap.get(char);
      if (!rule) {
        isCorrectlyOrdered = false;
        break;
      }

      for (let j = i + 1; j < pageChars.length; j++) {
        const nextChar = pageChars[j];
        if (!rule.includes(nextChar)) {
          isCorrectlyOrdered = false;
          break;
        }
      }
    }

    if (!isCorrectlyOrdered) {
      incorrectlyOrderedPages.push(page);
    }
  }
  return incorrectlyOrderedPages;
}

function getSumOfMidPageNumbers(correctlyOrderedPages) {
  let middlePageSum = 0;
  for (const page of correctlyOrderedPages) {
    const pageChars = page.split(',').map(Number);
    middlePageSum += pageChars[Math.floor(pageChars.length / 2)];
  }
  return middlePageSum;
}

function correctPages(incorrectlyOrderedPages, ruleMap) {
  const reorderedPages = [];

  for (const page of incorrectlyOrderedPages) {
    const pageChars = page.split(',');

    const occurences = new Map()

    for (const char of pageChars) {
      for (const otherChar of pageChars) {
        if (char === otherChar) {
          continue
        }

        if (ruleMap.has(char) && ruleMap.get(char).includes(otherChar)) {
          occurences.set(otherChar, occurences.get(otherChar) ? occurences.get(otherChar) + 1 : 1)
        }
      }
    }

    let correctedPage = []
    for (const char of pageChars) {
      let occurenceCount = occurences.get(char) ? occurences.get(char) : 0
      
      correctedPage[pageChars.length - 1 - occurenceCount] = char
    }

    reorderedPages.push(correctedPage.join(','));
  }
  return reorderedPages;
}

async function main() {
  const { rules, pages } = await readLines()

  const ruleMap = createRuleMap(rules)

  console.log(ruleMap)

  const incorrectlyOrderedPages = getIncorrectlyOrderedPages(pages, ruleMap);

  const reorderedPages = correctPages(incorrectlyOrderedPages, ruleMap);

  let middlePageSum = getSumOfMidPageNumbers(reorderedPages);

  console.log(middlePageSum)
}

main()
