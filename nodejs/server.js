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
// const socketToRoom = {};
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
    socket.emit('alluser', users);
    io.to(roomId).emit('userConnected', users[roomId]);
    socket.on('out', ({ idpeer }) => {
      console.log(idpeer);
      users[roomId] = users[roomId].filter((id) => id !== idpeer);
      console.log(users[roomId]);
      io.to(roomId).emit('userOut', users[roomId]);
    });
    // }
    //   socket.on("user", (data) => {
    //     io.in(roomId).emit("user", data);
    //   });
    //   socket.on("add_data", (data) => {
    //     io.to(roomId).emit("mesdata", data);
    //   });
    // });
    // socket.on("add", (data) => {
    //   io.emit("ms", data);
    // });
    // socket.on("join room", (roomID) => {
    //   if (users[roomID]) {
    //     const length = users[roomID].length;
    //     if (length === 4) {
    //       socket.emit("room full");
    //       return;
    //     }
    //     if (!users[roomID].includes(socket.id)) {
    //       users[roomID].push(socket.id);
    //     }
    //   } else {
    //     users[roomID] = [socket.id];
    //   }
    //   socketToRoom[socket.id] = roomID;
    //   if (users[roomID]) {
    //     console.log(users[roomID]);
    //     socket.emit("all users", users[roomID]);
    //   }
    // });
    // socket.on("sending signal", (payload) => {
    //   io.to(payload.userToSignal).emit("user joined", {
    //     signal: payload.signal,
    //     callerID: payload.callerID,
    //   });
    // });
    // socket.on("returning signal", (payload) => {
    //   io.to(payload.callerID).emit("receiving returned signal", {
    //     signal: payload.signal,
    //     id: socket.id,
    //   });
    // });
    // socket.on("disconnect", () => {
    //   const roomID = socketToRoom[socket.id];
    //   let room = users[roomID];
    //   if (room) {
    //     room = room.filter((id) => id !== socket.id);
    //     console.log(room);
    //     users[roomID] = room;
    //   }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Hello from in 😁');
});
