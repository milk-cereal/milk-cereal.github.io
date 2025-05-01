// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Socket.IO for real-time chat
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`🔌 New socket connected: ${socket.id}`);

  // Listen for display name from client
  socket.on('new user', (displayName) => {
    socket.displayName = displayName;
    console.log(` ${displayName} joined the chat`);
    socket.broadcast.emit('user joined', `${displayName} has joined the chat`);
  });

  // Chat message with display name
  socket.on('chat message', (msg) => {
    const name = socket.displayName || 'Anonymous';
    const messageData = {
      name,
      message: msg
    };
    console.log(` ${name}: ${msg}`);
    io.emit('chat message', messageData);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
