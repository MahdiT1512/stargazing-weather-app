const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to handle incoming data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory at the root
app.use('/public', express.static(path.join(__dirname, '..', '..', 'public'))); // Point to 'public' at root level

// Create the 'public/blogImages' directory if it doesn't exist
const uploadDir = path.join(__dirname, '..', '..', 'public', 'blogImages');
fs.mkdirSync(uploadDir, { recursive: true });

// Set up multer to handle image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save in 'public/blogImages'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Image upload route (POST /upload)
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  // Send back the relative path to the uploaded image
  res.json({ imageUrl: `/public/blogImages/${req.file.filename}` });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
