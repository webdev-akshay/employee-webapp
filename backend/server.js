const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS to allow requests from Angular frontend
app.use(cors());

// Body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// MongoDB connection string (replace with your MongoDB URI if using Atlas)
const dbURI = 'mongodb://localhost:27017/employee-db'; // Use MongoDB Atlas URI if needed

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Define routes (make sure these are in a separate routes file)
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Serve Angular build folder (if using Express to serve frontend)
app.use(express.static(path.join(__dirname, 'dist/your-angular-app')));

// Catch-all route for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/your-angular-app/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
