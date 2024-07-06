const puppeteer = require('puppeteer');

async function addTextToImage(text, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Load a blank HTML page
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              position: relative;
            }
            .text-overlay {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              font-family: Arial, sans-serif;
              font-size: 36px;
              color: white;
              text-shadow: 2px 2px 4px black;
              background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
              padding: 10px;
              border-radius: 5px;
              white-space: nowrap; /* Prevents text from wrapping */
            }
            img {
              max-width: 100%;
              max-height: 100%;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="/images/femboy.jpg}">
            <div class="text-overlay">${text}</div>
          </div>
        </body>
      </html>
    `);
  
    // Wait for image to load and render
    await page.waitForSelector('img');
  
    // Screenshot the page and save as an image
    await page.screenshot({ path: outputPath });
  
    await browser.close();
    console.log('Text added to image successfully.');
  }


const outputPath = 'images/brandnewimage/finishedimage.jpg'; // Replace with desired output path
const textToAdd = 'I like guys';

addTextToImage(textToAdd, outputPath);
