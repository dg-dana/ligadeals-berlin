const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:\\Users\\dgdan\\Downloads\\LigaDealsLogo.PNG';
const outputDir = path.join(__dirname, '../public');

async function optimizeLogo() {
  try {
    // Main logo - high quality
    await sharp(inputPath)
      .resize(400, 480, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'ligadeals-logo.png'));

    // Hero size - 200px width
    await sharp(inputPath)
      .resize(200, 240, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'ligadeals-logo-hero.png'));

    // Small size for navbar - 60px width
    await sharp(inputPath)
      .resize(60, 72, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'ligadeals-logo-small.png'));

    // Favicon sizes
    await sharp(inputPath)
      .resize(180, 180, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90 })
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    await sharp(inputPath)
      .resize(16, 16, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90 })
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    console.log('✅ Logo optimized successfully!');
    console.log('Created files:');
    console.log('  - ligadeals-logo.png (400x480 - main high quality)');
    console.log('  - ligadeals-logo-hero.png (200x240 - hero section)');
    console.log('  - ligadeals-logo-small.png (60x72 - navbar)');
    console.log('  - apple-touch-icon.png (180x180)');
    console.log('  - favicon-32x32.png (32x32)');
    console.log('  - favicon-16x16.png (16x16)');
  } catch (error) {
    console.error('Error optimizing logo:', error);
  }
}

optimizeLogo();
