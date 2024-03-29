import './alias';
import '@utils/unCaughtException';
import app from './app';
import { settings } from '@config/settings';
import connDB from '@config/database';
import declareUser from '@config/custom';
import { Server } from 'socket.io';
connDB();

const port = settings.PORT;

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {origin:'https://biogram.onrender.com'}
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('isTyping', ({ chatId, userId, userName }) => {
    // Broadcast the isTyping event to all other clients in the same chat room
    socket.to(chatId).emit('isTyping', { chatId, userId, userName });
  });
  socket.on('stop typing', ({ chatId, userId }) => {
    socket.to(chatId).emit('stop typing', { chatId, userId });
  });
  socket.on('new message', (newMessageReceived) => {
    let { chat } = newMessageReceived;

    if (!chat.users) return console.log('chats.users not defined');
    else {
      chat.users.forEach((user: any) => {
        socket.in(user._id).emit('message received', newMessageReceived);
      });
    }
  });
  socket.on('group rename', ({ chat, userId }) => {
    chat.users.forEach((user: any) => {
      if (user.id !== userId) {
        socket.in(user.id).emit('group rename');
      }
    });
  });
  socket.on('group remove', ({ chat, userId, removedUser }) => {
    chat.users.forEach((user: any) => {
      if (user.id !== userId) {
        socket.in(user.id).emit('group remove');
      }
    });
    socket.in(removedUser).emit('group remove');
  });
  socket.on('group add', (chat) => {
    chat.users.forEach((user: any) => {
      if (user.id !== chat.groupAdmin.id) {
        socket.in(user.id).emit('group add');
      }
    });
  });
});

//for unhandled rejection like mongo connection failed and this handler work for async rejection
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully!');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});
