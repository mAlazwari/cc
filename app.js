const express = require('express');
const path = require('path');
const cors = require('cors');
const os = require('os');
const app = express();

// This will serve files from the 'public' directory where 'index.html' is located
app.use(express.static('public'));
app.use(cors());
// Endpoint to serve the main page from the 'public' directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get content after the countdown
app.get('/get-content', cors(), (req, res) => {
  const releaseTime = new Date('2024-03-21T20:00:00-04:00'); // UTC time
  const currentTime = new Date();

  if (currentTime >= releaseTime) {
    // After the countdown, serve the content
    res.json({
      success: true,
      content: {
        title: "CREAM CATS",
        description: "The Cream Cats have arrived! It’s finally time for you to mint these awesome cats on the blockchain. Each Cream Cat is unique, made up of several traits that come together as you mint. What combo you get will be a mystery until you mint your ordinal. So what are you waiting for? Go meet your new Cream Cat and be sure to show it off to the world.",
        buttonText: "MINT",
        buttonLink: "https://your-minting-link.com",
        heroImage: "image3v2.png"
      }
    });
  } else {
    // Before the countdown, serve a placeholder or error
    res.json({
      success: false,
      message: "The content is not available yet."
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}. Listening on all interfaces.`);
  console.log(`Access the server locally at http://localhost:${PORT}`);
  
  // Attempt to log local IP addresses
  const networkInterfaces = os.networkInterfaces();
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((interface) => {
      if ('IPv4' === interface.family && !interface.internal) {
        console.log(`Accessible potentially at http://${interface.address}:${PORT} (Local Network)`);
      }
    });
  });
});
