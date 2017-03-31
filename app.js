const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');
// router v1
const contacts = require('./routes/v1/contacts');
const groups = require('./routes/v1/groups');

// router v2
const contactsTwo = require('./routes/v2/contacts');

const contactsControlerTwo = require('./controllers/v2/contacts');

const app = express();

mongoose.Promise = global.Promise;
const mongoDb = process.env.MONGO_DB || 'simple_user_contacts';
mongoose.connect('mongodb://localhost:27017/' + mongoDb);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// API version 1
app.use('/api/v1/contacts', contacts);
app.use('/api/v1/groups', groups);
// API version 2
app.use('/api/v2/contacts', contactsTwo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
