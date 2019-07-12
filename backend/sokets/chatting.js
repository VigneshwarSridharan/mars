let { getInfo } = require('../utils/jwt');
let User = require('../model/user');

module.exports = io => {

    let users = {};

    io.use((socket, next) => {
        let { token = '' } = socket.handshake.query

        if (token) {
            getInfo(token, (err, info) => {
                if (err) return next(new Error('authentication error'));

                socket.user_id = info.user_id;
                return next();
            })
        }

        return next(new Error('authentication error'));
    });

    io.on('connection', (socket) => {

        let { token = '' } = socket.handshake.query

        if (token) {
            getInfo(token, (err, info) => {
                if (err) return
                users[socket.id] = info.user_id;
                console.log(`User connected (${info.user_id})`)

                socket.broadcast.emit('active', users);
                socket.emit('active', users);
            })
        }

        socket.on('message', data => {
            let { id, message } = data;
            io.sockets.sockets[id].emit('message',{
                id:socket.id,
                message
            })
        })


        socket.on('disconnect', reason => {
            delete users[socket.id];
            console.log(`User disconnect (${socket.user_id})`)
        })

    });
}