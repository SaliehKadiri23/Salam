const fs = require('fs-extra');
const path = require('path');

// Copy the dist folder from client to the root
const source = path.join(__dirname, '..', 'client', 'dist');
const destination = path.join(__dirname, '..', 'dist');

// Remove the destination folder if it exists
if (fs.existsSync(destination)) {
  fs.removeSync(destination);
}

// Copy the dist folder
fs.copySync(source, destination);
console.log('Build files copied to root dist folder');