const { spawn } = require('child_process');
const path = require('path');

const projectPath = 'C:\\Users\\sflic\\Documents\\GitHub\\rositarococo.com';

const child = spawn('cmd', ['/c', 'npx', 'bmad-method', 'install'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  cwd: projectPath
});

// Send the project path
setTimeout(() => {
  child.stdin.write(projectPath + '\n');
}, 2000);

// Send Enter to select default components
setTimeout(() => {
  child.stdin.write('\n');
}, 4000);

// Send Enter to proceed
setTimeout(() => {
  child.stdin.write('\n');
}, 6000);

child.on('close', (code) => {
  console.log(`Installation completed with code: ${code}`);
});

child.on('error', (err) => {
  console.error('Error spawning process:', err);
});
