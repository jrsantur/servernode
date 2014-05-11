var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http"); 
var routes = require('./routes/index');
var users = require('./routes/users');
var sessions_user = require('./routes/sessions');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));



//passport inicializando
app.use(passport.initialize());
app.use(passport.session());


// Conexión
mongoose.connect('mongodb://localhost/DataEmpresa', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});









//var user  = require('./controllers/users')



var producto  = require('./controllers/producto')


app.use('/', routes);
app.use('/users', users);
app.use('/login', sessions_user); 


//... Y despues del comentario // Routes
app.get('/producto', producto.index)







/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;




//parte del login 

app.get('/login', function(req, res) {
  res.sendfile('views/login.html');
});

var auth = require('./controllers/authController.js');
app.post('/auth/login', auth.login);
app.post('/auth/logout', auth.logout);
app.get('/auth/login/success', auth.loginSuccess);
app.get('/auth/login/failure', auth.loginFailure);







app.listen(4000);
console.log("Server escuchando en el puerto 4000"); 
