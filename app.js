
require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const socketIO = require('socket.io');
const punycode = require('punycode/');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/notifications', require('./routes/notificationRoutes'));

// WebSocket setup
require('./sockets/notificationSocket')(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
        