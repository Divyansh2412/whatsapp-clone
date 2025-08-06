require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const messageRoutes = require('./backend/routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Root route for sanity check
app.get('/', (req, res) => {
  res.send('WhatsApp Clone Backend is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
  
  // Start server after successful DB connection
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Optional WebSocket (Socket.IO) integration:
  // Create Socket.IO server and attach to Express server
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });
  console.log('Socket.IO initialized');

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

}).catch(err => {
  console.error('MongoDB connection error:', err);
});
