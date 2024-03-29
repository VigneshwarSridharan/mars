var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var railwayRouter = require('./routes/railway');
var tradingRouter = require('./routes/trading');
var chattingRouter = require('./routes/chatting');
var bugCatcherRouter = require('./routes/bugCatcher');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/railway', railwayRouter);
app.use('/trading', tradingRouter);
app.use('/chatting', chattingRouter);
app.use('/bug-catcher', bugCatcherRouter);

module.exports = app;
