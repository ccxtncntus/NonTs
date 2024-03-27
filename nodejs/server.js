import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouters from './routers/UserRouters.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
mongoose.connect(process.env.SERVER_MONGO);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', UserRouters);

const PORT = process.env.SERVER_PORT || 5000;

const users = {};
io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, userId }) => {
    socket.join(roomId);
    if (users[roomId]) {
      const length = users[roomId].length;
      if (length == 2) {
        console.log('full');
        socket.emit('room-full', {
          success: false,
          mgs: 'Phòng đầy rồi',
        });
        return;
      }
      users[roomId].push(userId);
    } else {
      users[roomId] = [userId];
    }
    console.log(users);
    socket.on('calluser', ({ slug }) => {
      const result = Object.keys(users).map((key) => [key, users[key]]);
      const newMap = result
        .filter((i) => {
          if (i[1].length === 1 && i[0] != slug) {
            return i[0];
          }
        })
        .map((item) => item[0]);
      const randomIndex = Math.floor(Math.random() * newMap.length); // Lấy một chỉ số ngẫu nhiên
      if (newMap[randomIndex]) {
        io.to(roomId).emit('alluser', newMap[randomIndex]);
      } else {
        io.to(roomId).emit('alluser', 0);
      }
    });
    io.to(roomId).emit('userConnected', users[roomId]);
    socket.on('out', ({ idpeer }) => {
      users[roomId] = users[roomId].filter((id) => id !== idpeer);
      console.log(users[roomId]);
      io.to(roomId).emit('userOut', users[roomId]);
    });
    // socket.on("disconnect", () => {
    //   const roomID = socketToRoom[socket.id];
    //   let room = users[roomID];
    //   if (room) {
    //     room = room.filter((id) => id !== socket.id);
    //     console.log(room);
    //     users[roomID] = room;
    //   }
  });
  socket.on('uu', () => {
    // users[roomId] = users[roomId].filter((id) => id !== idpeer);
    // console.log(users[roomId]);
    io.emit('u', users);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Hello from in 😁');
});
