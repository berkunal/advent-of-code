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

function getCorrectlyOrderedPages(pages, ruleMap) {
  const correctlyOrderedPages = [];

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

    if (isCorrectlyOrdered) {
      correctlyOrderedPages.push(page);
    }
  }
  return correctlyOrderedPages;
}

function getSumOfMidPageNumbers(correctlyOrderedPages) {
  let middlePageSum = 0;
  for (const page of correctlyOrderedPages) {
    const pageChars = page.split(',').map(Number);
    middlePageSum += pageChars[Math.floor(pageChars.length / 2)];
  }
  return middlePageSum;
}

async function main() {
  const { rules, pages } = await readLines()

  const ruleMap = createRuleMap(rules)

  console.log(ruleMap)

  const correctlyOrderedPages = getCorrectlyOrderedPages(pages, ruleMap);

  console.log(correctlyOrderedPages)

  let middlePageSum = getSumOfMidPageNumbers(correctlyOrderedPages);

  console.log(middlePageSum)
}

main()
