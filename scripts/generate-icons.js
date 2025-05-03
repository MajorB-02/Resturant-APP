const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const generateIcons = async () => {
  try {
    // Create icons directory if it doesn't exist
    const iconsDir = path.join('public', 'icons');
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Create a simple icon with text and background
    const baseIcon = sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 220, g: 38, b: 38, alpha: 1 } // Tailwind red-600
      }
    })
    .composite([{
      input: {
        text: {
          text: 'R',
          font: 'sans-serif',
          fontSize: 300,
          rgba: true
        }
      },
      top: 106,
      left: 156
    }]);

    // Generate icons for each size
    console.log('Generating icons...');
    for (const size of sizes) {
      await baseIcon
        .clone()
        .resize(size, size)
        .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    }

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
};

generateIcons(); 