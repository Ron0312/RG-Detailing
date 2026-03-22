import fs from 'node:fs';

const content = fs.readFileSync('src/pages/admin/stats.astro', 'utf-8');
const searchStr = 'const maxVal = chartData.reduce((max, d) => Math.max(max, d.views), 10);';

if (content.includes(searchStr)) {
    console.log('Optimization found in file.');
} else {
    console.error('Optimization NOT found in file.');
    process.exit(1);
}

// Basic sanity check for reduce logic
const testData = [{views: 5}, {views: 20}, {views: 15}];
const maxVal = testData.reduce((max, d) => Math.max(max, d.views), 10);
if (maxVal === 20) {
    console.log('Reduce logic verified with test data (max 20).');
} else {
    console.error('Reduce logic failed. Expected 20, got ' + maxVal);
    process.exit(1);
}

const emptyData = [];
const maxValEmpty = emptyData.reduce((max, d) => Math.max(max, d.views), 10);
if (maxValEmpty === 10) {
    console.log('Reduce logic verified with empty data (max 10).');
} else {
    console.error('Reduce logic failed for empty data. Expected 10, got ' + maxValEmpty);
    process.exit(1);
}
