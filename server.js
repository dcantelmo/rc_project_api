const app = require('express')();
const server = require('http').Server(app);
const socketIo = require("socket.io");

const io = socketIo(server);

io.on("connection", (socket) => {
    console.log('Connected: ' + socket.id + " " + socket.handshake.query.room);
    socket.on("strokes", (data) => {
        socket.broadcast.emit("strokes", (data));
    })
    socket.on('clearDrawing', () => {
        socket.broadcast.emit("clearDrawing");
    })
    socket.on('redraw', (data) => {
        socket.broadcast.emit("redraw", data);
    })
    socket.on('imageState', (data) => {
        socket.broadcast.emit("getImageState", data);
    })
})


server.listen(4000, () => {
    console.log("server listening on port 4000");
})