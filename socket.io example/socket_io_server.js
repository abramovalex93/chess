var io = require('socket.io').listen(81);

io.sockets.on('connection', function (socket) {
    console.log('* ' + socket.id + ' joined');
    socket.on('select_room', function(data) {
        console.log(socket.id + ' selected room % ' + data);
        socket.join(data);
    });
    socket.on('leave_room', function(data) {
        console.log(socket.id + ' left room % ' + data);
        socket.leave(data);
    });
    socket.on('message', function(data) {
        if (data.room != undefined) socket.broadcast.to(data.room).emit('message', socket.id + ':' + data.msg);
        else socket.broadcast.emit('message', socket.id + ':' + data.msg);
    });
    socket.on('info_port', function(data) {
        if (data === 'clients') {
            console.log('all_clients:');
            console.log(io.sockets.sockets);
        }
        if (data === 'rooms') {
            console.log('all rooms:');
            console.log(io.sockets.manager.rooms);
        }
        if (data === 'room_clients') {
            console.log('room clients:');
            console.log(io.sockets.clients('room1'));
        }
    });
});