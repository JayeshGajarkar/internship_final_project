const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Route to handle POST requests for creating a user
app.post('/user', (req, res) => {
  const { name, email,role, password } = req.body;

  console.log('User data:', { name, email, password,role    });

  res.status(201).send({ message: 'User created successfully', user: { name, email } });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});