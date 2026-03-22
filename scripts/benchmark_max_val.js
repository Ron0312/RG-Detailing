const chartData = Array.from({ length: 10000 }, (_, i) => ({
  views: Math.floor(Math.random() * 1000)
}));

const ITERATIONS = 1000;

console.log(`Benchmarking with ${chartData.length} elements and ${ITERATIONS} iterations...`);

console.time('Math.max(...map)');
for (let i = 0; i < ITERATIONS; i++) {
  const maxVal = Math.max(...chartData.map(d => d.views), 10);
}
console.timeEnd('Math.max(...map)');

console.time('reduce');
for (let i = 0; i < ITERATIONS; i++) {
  const maxVal = chartData.reduce((max, d) => Math.max(max, d.views), 10);
}
console.timeEnd('reduce');

// Test stack limit
const largeChartData = Array.from({ length: 200000 }, (_, i) => ({
  views: Math.floor(Math.random() * 1000)
}));

console.log(`Testing stack limit with ${largeChartData.length} elements...`);
try {
  const maxVal = Math.max(...largeChartData.map(d => d.views), 10);
  console.log('Math.max(...map) succeeded');
} catch (e) {
  console.log('Math.max(...map) failed:', e.message);
}

try {
  const maxVal = largeChartData.reduce((max, d) => Math.max(max, d.views), 10);
  console.log('reduce succeeded');
} catch (e) {
  console.log('reduce failed:', e.message);
}
