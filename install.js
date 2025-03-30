const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Installing dependencies for markdown and KaTeX rendering...');

try {
    // Check if package.json exists
    if (!fs.existsSync('package.json')) {
        console.error('package.json not found! Please run this script in the project root directory.');
        process.exit(1);
    }

    // Install all dependencies from package.json
    console.log('Installing dependencies from package.json...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('\nInstallation completed successfully!');
    console.log('\nTesting the build process...');

    try {
        execSync('node build.js', { stdio: 'inherit' });
        console.log('\nBuild test successful!');
        console.log('\nYou can now run "npm start" to start the server and view your site.');
    } catch (buildError) {
        console.error('\nBuild test failed:', buildError);
        console.log('\nPlease check the error messages above and fix any issues.');
    }
} catch (error) {
    console.error('Installation failed:', error);
    process.exit(1);
} 