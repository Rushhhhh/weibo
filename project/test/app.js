var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var index = require('./routes/index');
var users = require('./routes/users');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

var register = require("./routes/register");
var login = require("./routes/login");
var self = require("./routes/self");
var article = require("./routes/article");
var detail = require("./routes/detail");
var session = require("express-session");

var api = require("./api/home");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	name:"userID",
	secret:"dwdw",
	cookie:{maxAge:1000*3600},
	resave:true,
	saveUninitialized:true
}));


app.use('/', index);
app.use('/users', users);

app.use('/register', register);
app.use('/login', login);
app.use('/self', self);
app.use('/article', article);
app.use('/detail', detail);
app.use('/api', api);





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
