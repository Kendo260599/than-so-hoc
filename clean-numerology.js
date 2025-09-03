import fs from 'fs';

console.log('Cleaning numerology.js...');

// Read the file
const content = fs.readFileSync('src/numerology.js', 'utf8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);

// Find the first calcLifePathPeriods export
let firstFound = -1;
let duplicateStart = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export function calcLifePathPeriods')) {
    if (firstFound === -1) {
      firstFound = i;
      console.log(`First calcLifePathPeriods at line: ${i + 1}`);
    } else {
      duplicateStart = i;
      console.log(`Duplicate calcLifePathPeriods at line: ${i + 1}`);
      break;
    }
  }
}

if (duplicateStart > 0) {
  // Keep only the part before duplication
  const cleanLines = lines.slice(0, duplicateStart);
  
  // Write back to file
  fs.writeFileSync('src/numerology.js', cleanLines.join('\n'));
  console.log(`Cleaned file. New line count: ${cleanLines.length}`);
} else {
  console.log('No duplication found');
}
