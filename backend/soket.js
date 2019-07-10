let { getInfo } = require('./utils/jwt');
let User = require('./model/user');

module.exports = io => {
    io.on('connection', function (socket) {
        let { token = '' } = socket.handshake.query
        if (token) {
            getInfo(token, (err, info) => {
                if (err) return console.log(err);
                socket.user_id = info.user_id;
            })
        }
        socket.on('getinfo', data => {
            console.log('id', socket.user_id);
            if (!socket.user_id) return;

            User.userInfo(socket.user_id, (err, userInfo) => {
                if (err) return console.log(err);

                socket.emit('message', userInfo)
            })
        })
    });
}