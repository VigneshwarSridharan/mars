let { getInfo } = require('../utils/jwt');
let User = require('../model/user');
let redis = require("redis");

let client = redis.createClient();

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

                client.keys(`chat-*-${users[socket.id]}`, (err, keys) => {
                    keys.map(key => {
                        client.get(key, (err, value) => {
                            if (err) return console.log(err)

                            value = JSON.parse(value);
                            value.map(data => {
                                socket.emit('message', data)
                            })
                            client.del(key);
                        })
                    })
                })

            })
        }


        socket.on('typing', data => {
            let { user_id, focus } = data;
            let inx = Object.values(users).indexOf(user_id);
            let sendData = {
                user_id: users[socket.id],
                focus
            }
            // Check user is active
            if (inx != -1) {
                let id = Object.keys(users)[inx];
                io.sockets.sockets[id].emit('typing', sendData)

            }


        })

        socket.on('message', data => {
            let { user_id, message } = data;
            let inx = Object.values(users).indexOf(user_id);
            let sendData = {
                user_id: users[socket.id],
                message,
                type: 'receive'
            }
            // Check user is active
            if (inx != -1) {
                let id = Object.keys(users)[inx];
                io.sockets.sockets[id].emit('message', sendData)
            }
            else {
                client.get(`chat-${users[socket.id]}-${user_id}`, (err, value) => {
                    if (err) return console.log(err)
                    if (value) {
                        sendData = [...JSON.parse(value), sendData]
                    }
                    else {
                        sendData = [sendData];
                    }
                    client.set(`chat-${users[socket.id]}-${user_id}`, JSON.stringify(sendData))
                })
            }
        })


        socket.on('disconnect', reason => {
            delete users[socket.id];
            console.log(`User disconnect (${socket.user_id})`)
        })

    });
}