const fs = require('fs');
const path = require('path');
const https = require('https');

const images = {
  hero: 'https://source.unsplash.com/1920x1080/?restaurant,interior',
  about: 'https://placehold.co/1920x1080/444/fff/png?text=Our+Story',
  menu: {
    pizza: 'https://source.unsplash.com/800x600/?pizza,italian',
    salad: 'https://source.unsplash.com/800x600/?salad,fresh',
    pasta: 'https://source.unsplash.com/800x600/?pasta,italian',
    dessert: 'https://source.unsplash.com/800x600/?dessert,cake'
  },
  team: {
    chef1: 'https://placehold.co/400x400/889/fff/png?text=John+Smith',
    chef2: 'https://placehold.co/400x400/888/fff/png?text=Sarah+Johnson',
    chef3: 'https://placehold.co/400x400/887/fff/png?text=Michael+Brown'
  }
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 302) {
        return https.get(response.headers.location, (finalResponse) => {
          finalResponse.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
        });
      }
      
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

const createDirectories = () => {
  const dirs = ['public/images', 'public/icons'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

const downloadImages = async () => {
  try {
    createDirectories();
    
    // Download hero image
    console.log('Downloading hero image...');
    await downloadImage(images.hero, 'public/images/hero-bg.jpg');
    
    // Download menu images
    console.log('Downloading menu images...');
    for (const [key, url] of Object.entries(images.menu)) {
      console.log(`Downloading ${key}...`);
      await downloadImage(url, `public/images/${key}.jpg`);
    }
    
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadImages(); 