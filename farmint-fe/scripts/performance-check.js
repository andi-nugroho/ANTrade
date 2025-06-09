#!/usr/bin/env node

/**
 * Performance Check Script
 * Analyzes bundle size and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');

function checkBundleSize() {
  const buildDir = path.join(__dirname, '../out');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }

  console.log('🔍 Analyzing bundle size...\n');

  // Check main bundle files
  const jsFiles = [];
  const cssFiles = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.js')) {
        jsFiles.push({
          name: file,
          size: stat.size,
          path: filePath
        });
      } else if (file.endsWith('.css')) {
        cssFiles.push({
          name: file,
          size: stat.size,
          path: filePath
        });
      }
    });
  }

  scanDirectory(buildDir);

  // Sort by size
  jsFiles.sort((a, b) => b.size - a.size);
  cssFiles.sort((a, b) => b.size - a.size);

  // Calculate total sizes
  const totalJsSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
  const totalCssSize = cssFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSize = totalJsSize + totalCssSize;

  console.log('📊 Bundle Analysis Results:');
  console.log('═'.repeat(50));
  console.log(`Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log(`JavaScript: ${formatBytes(totalJsSize)}`);
  console.log(`CSS: ${formatBytes(totalCssSize)}`);
  console.log('');

  // Show largest JS files
  console.log('📦 Largest JavaScript Files:');
  jsFiles.slice(0, 5).forEach((file, index) => {
    const percentage = ((file.size / totalJsSize) * 100).toFixed(1);
    console.log(`${index + 1}. ${file.name} - ${formatBytes(file.size)} (${percentage}%)`);
  });
  console.log('');

  // Performance recommendations
  console.log('💡 Performance Recommendations:');
  console.log('─'.repeat(30));
  
  if (totalSize > 2 * 1024 * 1024) { // 2MB
    console.log('⚠️  Bundle size is large (>2MB). Consider:');
    console.log('   • Code splitting with dynamic imports');
    console.log('   • Tree shaking unused dependencies');
    console.log('   • Using lighter alternatives for heavy libraries');
  } else if (totalSize > 1 * 1024 * 1024) { // 1MB
    console.log('⚡ Bundle size is moderate (>1MB). Consider:');
    console.log('   • Lazy loading non-critical components');
    console.log('   • Optimizing images and assets');
  } else {
    console.log('✅ Bundle size is good (<1MB)');
  }

  // Check for common performance issues
  checkPerformanceIssues();
}

function checkPerformanceIssues() {
  console.log('\n🔍 Checking for Performance Issues:');
  console.log('─'.repeat(35));

  const issues = [];
  const recommendations = [];

  // Check package.json for heavy dependencies
  const packagePath = path.join(__dirname, '../package.json');
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    // Check for heavy libraries
    const heavyLibs = [
      'lodash',
      'moment',
      'axios',
      'react-router-dom',
      'styled-components'
    ];

    heavyLibs.forEach(lib => {
      if (deps[lib]) {
        issues.push(`Heavy dependency detected: ${lib}`);
        
        const alternatives = {
          'lodash': 'Use native JS methods or lodash-es',
          'moment': 'Use date-fns or dayjs',
          'axios': 'Use native fetch API',
          'styled-components': 'Use Tailwind CSS or CSS modules'
        };

        if (alternatives[lib]) {
          recommendations.push(`Consider replacing ${lib} with: ${alternatives[lib]}`);
        }
      }
    });
  }

  // Check for unoptimized images
  const publicDir = path.join(__dirname, '../public');
  if (fs.existsSync(publicDir)) {
    const imageFiles = [];
    
    function findImages(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          findImages(filePath);
        } else if (/\.(jpg|jpeg|png|gif|svg)$/i.test(file)) {
          imageFiles.push({
            name: file,
            size: stat.size,
            path: filePath
          });
        }
      });
    }

    findImages(publicDir);
    
    const largeImages = imageFiles.filter(img => img.size > 500 * 1024); // >500KB
    if (largeImages.length > 0) {
      issues.push(`${largeImages.length} large image(s) detected (>500KB)`);
      recommendations.push('Optimize images: compress, use WebP format, add responsive sizes');
    }
  }

  // Display results
  if (issues.length === 0) {
    console.log('✅ No major performance issues detected');
  } else {
    console.log('⚠️  Issues found:');
    issues.forEach(issue => console.log(`   • ${issue}`));
  }

  if (recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    recommendations.forEach(rec => console.log(`   • ${rec}`));
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the check
console.log('🚀 FarMint Performance Check\n');
checkBundleSize();
