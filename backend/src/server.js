import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.BACKEND_PORT || 5000);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('user_online', (userId) => {
    socket.broadcast.emit('user_online', { userId });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user_offline');
  });
});

app.set('io', io);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`SnapClone backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
