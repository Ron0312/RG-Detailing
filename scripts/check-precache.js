import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const swPath = path.join(projectRoot, 'public', 'sw.js');
const publicDir = path.join(projectRoot, 'public');

try {
  const swContent = fs.readFileSync(swPath, 'utf8');

  // Extract PRECACHE_URLS array content
  const match = swContent.match(/const PRECACHE_URLS = \[([\s\S]*?)\];/);

  if (!match) {
    console.error('Could not find PRECACHE_URLS in sw.js');
    process.exit(1);
  }

  const urlsString = match[1];
  const urls = urlsString
    .split(',')
    .map(url => url.trim().replace(/['"]/g, ''))
    .filter(url => url.length > 0);

  console.log(`Checking ${urls.length} URLs from PRECACHE_URLS...`);

  let hasError = false;

  urls.forEach(url => {
    // Skip root url
    if (url === '/') return;

    const filePath = path.join(publicDir, url);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ MISSING: ${url} (checked at ${filePath})`);
      hasError = true;
    } else {
      console.log(`✅ FOUND: ${url}`);
    }
  });

  if (hasError) {
    console.error('\nFAILURE: Some precached files are missing.');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: All precached files exist.');
    process.exit(0);
  }

} catch (err) {
  console.error('Error reading sw.js:', err);
  process.exit(1);
}
