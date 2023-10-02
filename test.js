const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // Replace with your backend's URL

// Example: Register a new user
axios
  .post(`${BASE_URL}/register`, {
    username: 'harihar',
    email: 'test@exasdmple.com',
    password: 'testpassword',
  })
  .then((response) => {
    console.log('Registration response:', response.data);
  })
  .catch((error) => {
    console.error('Registration error:', error);
  });

// Example: Log in
axios
  .post(`${BASE_URL}/login`, {
    username: 'harihar',
    password: 'testpassword',
  })
  .then((response) => {
    console.log('Login response:', response.data);
  })
  .catch((error) => {
    console.error('Login error:', error);
  });

// Add more test cases as needed

