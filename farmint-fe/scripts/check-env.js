const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking build environment...\n');

// Check Node.js version
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    console.log('⚠️  Warning: Node.js 18+ is recommended for Next.js 13+');
  }
} catch (error) {
  console.log('❌ Could not check Node.js version');
}

// Check package manager
try {
  const hasPnpm = execSync('pnpm --version', { encoding: 'utf8', stdio: 'pipe' });
  console.log(`✅ pnpm version: ${hasPnpm.trim()}`);
} catch (error) {
  try {
    const hasNpm = execSync('npm --version', { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ npm version: ${hasNpm.trim()}`);
    console.log('💡 Consider using pnpm for better performance');
  } catch (npmError) {
    console.log('❌ No package manager found');
  }
}

// Check if .next exists and is writable
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  try {
    // Try to create a test file
    const testFile = path.join(nextDir, 'test-write.tmp');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✅ .next directory is writable');
  } catch (error) {
    console.log('⚠️  .next directory exists but may not be writable');
    console.log('💡 Try running: npm run clean');
  }
} else {
  console.log('✅ No .next directory (clean state)');
}

// Check disk space (Windows)
if (process.platform === 'win32') {
  try {
    const stats = fs.statSync(process.cwd());
    console.log('✅ Project directory accessible');
  } catch (error) {
    console.log('⚠️  Project directory access issues');
  }
}

// Check for common issues
const commonIssues = [];

// Check for long path names (Windows issue)
if (process.platform === 'win32' && process.cwd().length > 200) {
  commonIssues.push('Path is very long - this can cause issues on Windows');
}

// Check for spaces in path
if (process.cwd().includes(' ')) {
  commonIssues.push('Path contains spaces - this can sometimes cause issues');
}

// Check for non-ASCII characters
if (!/^[\x00-\x7F]*$/.test(process.cwd())) {
  commonIssues.push('Path contains non-ASCII characters - this can cause issues');
}

if (commonIssues.length > 0) {
  console.log('\n⚠️  Potential issues detected:');
  commonIssues.forEach(issue => console.log(`   - ${issue}`));
}

// Environment variables
console.log('\n📋 Environment variables:');
console.log(`   NEXT_TELEMETRY_DISABLED: ${process.env.NEXT_TELEMETRY_DISABLED || 'not set'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);

console.log('\n🎯 Recommendations:');
console.log('   1. Use: npm run build:safe (for safe building)');
console.log('   2. Use: npm run clean (to clean build files)');
console.log('   3. Run as Administrator if permission issues persist');

console.log('\n✨ Environment check complete!');
