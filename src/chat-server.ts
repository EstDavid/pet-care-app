import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a conversation room
  socket.on('join_room', (conversationId) => {
    socket.join(conversationId);
  });

  // Send a message to a conversation room
  socket.on('send_msg', async (data, conversationId) => {
    io.to(conversationId).emit('receive_msg', data);
  });
  //

  // Leave a conversation room
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

export default io;
