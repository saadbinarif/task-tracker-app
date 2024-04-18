const socketIO = require('socket.io');

function initializeSocket(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000/"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        // Disconnect event
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;