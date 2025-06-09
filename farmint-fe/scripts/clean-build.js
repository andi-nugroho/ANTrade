const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    try {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`✅ Cleaned: ${folderPath}`);
    } catch (error) {
      console.warn(`⚠️  Could not clean ${folderPath}:`, error.message);
      
      // Try alternative method for Windows
      try {
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
          const filePath = path.join(folderPath, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            deleteFolderRecursive(filePath);
          } else {
            try {
              fs.unlinkSync(filePath);
            } catch (unlinkError) {
              console.warn(`Could not delete file ${filePath}:`, unlinkError.message);
            }
          }
        }
        fs.rmdirSync(folderPath);
        console.log(`✅ Cleaned (alternative method): ${folderPath}`);
      } catch (altError) {
        console.error(`❌ Failed to clean ${folderPath}:`, altError.message);
      }
    }
  }
}

// Clean build directories
const buildDirs = [
  '.next',
  'out',
  '.vercel',
  'dist'
];

console.log('🧹 Cleaning build directories...');

buildDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  deleteFolderRecursive(dirPath);
});

console.log('✨ Build cleanup complete!');
