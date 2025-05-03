
const fs = require('fs');
const path = require('path');

// Directories
const DIST_DIR = path.join(__dirname, '../standalone-dist');
const PACKAGE_DIR = path.join(__dirname, '../robot-package');
const ASSETS_DIR = path.join(PACKAGE_DIR, 'robot-assets');

// Create directories
if (!fs.existsSync(PACKAGE_DIR)) {
  fs.mkdirSync(PACKAGE_DIR, { recursive: true });
}

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Copy built files to assets directory
fs.readdirSync(DIST_DIR).forEach(file => {
  fs.copyFileSync(
    path.join(DIST_DIR, file),
    path.join(ASSETS_DIR, file)
  );
});

// Copy the example HTML file
const exampleHtml = fs.readFileSync(path.join(__dirname, '../src/export.html'), 'utf8');
fs.writeFileSync(path.join(PACKAGE_DIR, 'index.html'), exampleHtml);

// Create README file
const readmeContent = `# Talking Robot Widget

This package contains everything you need to add a talking 3D robot to your website.

## Quick Setup

1. Extract this ZIP file to your project.
2. Copy the \`robot-assets\` folder to your website directory.
3. Add this code to your HTML:

\`\`\`html
<!-- In the <head> section -->
<link rel="stylesheet" href="robot-assets/talking-robot.css">

<!-- In the <body> section -->
<div id="robot-container" style="width: 100%; height: 500px;"></div>

<!-- Before the closing </body> tag -->
<script src="robot-assets/talking-robot.umd.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the robot
    const robotApi = window.InitTalkingRobot('robot-container');
    
    // Optional: Control the robot programmatically
    // robotApi.speak('Hello world!', 'it-IT');
  });
</script>
\`\`\`

## API

- \`window.InitTalkingRobot(containerId)\` - Initialize the robot in the specified container
- \`robotApi.speak(text, language)\` - Make the robot speak the given text
  - Supported languages: 'it-IT' (Italian), 'fr-FR' (French), 'de-DE' (German), 'es-ES' (Spanish)

## Example

See the included \`index.html\` file for a complete working example.
`;

fs.writeFileSync(path.join(PACKAGE_DIR, 'README.md'), readmeContent);

// Create a zip creation script (will need to be run separately)
const zipScriptContent = `
// To create a ZIP file, you can use a tool like JSZip or the native Node.js zlib
// This is just a placeholder - you would run this after building the standalone package

/*
const { zip } = require('zip-a-folder');

(async () => {
  await zip('./robot-package', './robot-package.zip');
  console.log('Package has been zipped successfully!');
})();
*/

console.log('Standalone package created successfully!');
console.log('You can find it in the robot-package directory.');
console.log('To create a ZIP file, use a ZIP utility to compress the robot-package folder.');
`;

fs.writeFileSync(path.join(__dirname, 'create-zip.js'), zipScriptContent);

console.log('Standalone package prepared successfully!');
console.log('You can find it in the robot-package directory.');
