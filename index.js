const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const socketIo = require('socket.io');
const http = require('http'); // Import the HTTP module
const app = express();
app.use(bodyParser.json());

let usersData = [];
try {
  const userDataFile = fs.readFileSync('users.json', 'utf8');
  usersData = JSON.parse(userDataFile);
} catch (error) {
  console.error('Error reading users.json:', error);
}

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const isUsernameTaken = usersData.some((user) => user.username === username);
  const isEmailTaken = usersData.some((user) => user.email === email);

  if (isUsernameTaken || isEmailTaken) {
    return res.status(400).json({ message: 'Username or email already in use' });
  }

  const newUser = {
    username,
    email,
    password,
    authKey: generateAuthKey(),
  };
  usersData.push(newUser);

  fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));


  return res.json({ message: 'User registered successfully' });
});
// Profiile image uploader
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' }); // Define the upload directory

app.post('/upload-profile', upload.single('profilePicture'), (req, res) => {
  // Handle profile picture upload
  const profilePicturePath = req.file.path;
  // Save the path to the user's profile in your database or user data
  res.json({ message: 'Profile picture uploaded successfully' });
});

// Socket here 

const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Initialize socket.io and attach it to the server

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Add your WebSocket event handlers here
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

function generateAuthKey() {
  const min = 100000000;
  const max = 999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



