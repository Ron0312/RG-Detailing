<?php
// manual_deploy.php
// A script to manually trigger the build and deployment process on Plesk environments
// AUTHOR: Jules (AI Assistant)
// DATE: 2026-02-05

header('Content-Type: text/plain');
ini_set('display_errors', 1);
ini_set('max_execution_time', 300); // 5 minutes timeout

echo "=== RG DETAILING MANUAL DEPLOYMENT TOOL ===\n";
echo "Start Time: " . date('Y-m-d H:i:s') . "\n\n";

// 1. Check environment
echo "[1] Checking Environment...\n";
echo "Current Directory: " . getcwd() . "\n";
echo "User: " . get_current_user() . "\n";

// Check for Node/NPM
$nodeVersion = shell_exec('node -v 2>&1');
$npmVersion = shell_exec('npm -v 2>&1');

echo "Node Version: " . ($nodeVersion ? trim($nodeVersion) : "NOT FOUND") . "\n";
echo "NPM Version: " . ($npmVersion ? trim($npmVersion) : "NOT FOUND") . "\n\n";

if (!$npmVersion) {
    echo "ERROR: NPM is not available in the shell environment. Trying to source common paths...\n";
    // Attempt to add common Plesk node paths
    putenv('PATH=' . getenv('PATH') . ':/opt/plesk/node/20/bin:/opt/plesk/node/18/bin');
    $npmVersion = shell_exec('npm -v 2>&1');
    echo "Retry NPM Version: " . ($npmVersion ? trim($npmVersion) : "STILL NOT FOUND") . "\n\n";
}

// 2. Install Dependencies (Optional, usually already done)
// echo "[2] Installing Dependencies (npm install)...\n";
// $outputInstall = shell_exec('npm install 2>&1');
// echo $outputInstall . "\n\n";

// 3. Build Project
echo "[3] Building Project (npm run build)...\n";
// We use the updated 'build' script which includes 'cp -r dist/client/* .'
$outputBuild = shell_exec('npm run build 2>&1');
echo $outputBuild . "\n\n";

// 4. Verify Index.html
echo "[4] Verification...\n";
if (file_exists('index.html')) {
    echo "SUCCESS: index.html exists in root.\n";
    echo "Last Modified: " . date('Y-m-d H:i:s', filemtime('index.html')) . "\n";
    echo "Size: " . filesize('index.html') . " bytes\n";
} else {
    echo "FAILURE: index.html NOT found in root.\n";
}

echo "\n=== DEPLOYMENT FINISHED ===\n";
echo "If you see SUCCESS above, please clear your browser cache and refresh the homepage.\n";
