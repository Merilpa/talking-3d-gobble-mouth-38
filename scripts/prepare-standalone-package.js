
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Directories
const DIST_DIR = path.join(__dirname, '../standalone-dist');
const PACKAGE_DIR = path.join(__dirname, '../robot-package');
const ASSETS_DIR = path.join(PACKAGE_DIR, 'robot-assets');

console.log('Starting standalone package preparation...');

// Create directories
if (!fs.existsSync(PACKAGE_DIR)) {
  fs.mkdirSync(PACKAGE_DIR, { recursive: true });
}

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Copy built files to assets directory
console.log('Copying built files to assets directory...');
fs.readdirSync(DIST_DIR).forEach(file => {
  fs.copyFileSync(
    path.join(DIST_DIR, file),
    path.join(ASSETS_DIR, file)
  );
});

// Copy the example HTML file
console.log('Creating example HTML file...');
const exampleHtml = fs.readFileSync(path.join(__dirname, '../src/export.html'), 'utf8');
fs.writeFileSync(path.join(PACKAGE_DIR, 'index.html'), exampleHtml);

// Create README file
const readmeContent = `# Robot Parlante 3D - Pronto all'uso

Questo pacchetto contiene tutto il necessario per aggiungere un robot parlante 3D al tuo sito web.
NON RICHIEDE Node.js o altri strumenti di sviluppo.

## Installazione Rapida

1. Estrai questo file ZIP nella directory del tuo sito web.
2. Assicurati che la cartella \`robot-assets\` sia accessibile dal tuo sito web.
3. Aggiungi questo codice al tuo HTML:

\`\`\`html
<!-- Nel tag <head> -->
<link rel="stylesheet" href="robot-assets/talking-robot.css">

<!-- Nel corpo della pagina -->
<div id="robot-container" style="width: 100%; height: 500px;"></div>

<!-- Prima del tag </body> di chiusura -->
<script src="robot-assets/talking-robot.umd.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il robot
    const robotApi = window.InitTalkingRobot('robot-container');
    
    // Opzionale: Controlla il robot con JavaScript
    // robotApi.speak('Ciao mondo!', 'it-IT');
  });
</script>
\`\`\`

## API JavaScript

- \`window.InitTalkingRobot(containerId)\` - Inizializza il robot nel contenitore specificato e restituisce un oggetto API
- \`robotApi.speak(text, language)\` - Fa parlare il robot con il testo fornito
  - Lingue supportate: 'it-IT' (Italiano), 'fr-FR' (Francese), 'de-DE' (Tedesco), 'es-ES' (Spagnolo)

## Esempio Completo

Vedi il file \`index.html\` incluso in questo pacchetto per un esempio completo e funzionante.
Apri questo file nel browser per vedere subito il robot in azione!
`;

fs.writeFileSync(path.join(PACKAGE_DIR, 'README.md'), readmeContent);

// Create zip file from the package directory
console.log('Creating ZIP file...');
const output = fs.createWriteStream(path.join(__dirname, '../robot-package.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Max compression
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`Standalone package created successfully! (${archive.pointer()} total bytes)`);
  console.log('ZIP file available at: robot-package.zip');
});

// Archive any errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append files from the robot-package directory without the root folder name
archive.directory(PACKAGE_DIR, false);

// Finalize the archive
archive.finalize();
