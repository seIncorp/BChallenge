var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

let upload = require('./background/load');
let UsersData = require('./background/users_data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* DA se prepreči CORS napake */
app.use((req,res,next)=> {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization ');
	
	if(req.method === "OPTIONS")
	{
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// uploading users and users data
upload.getUsers().then((result) => {
  result.forEach(element => {
    UsersData.addUser(element);
  });

  
});

upload.getAlbums().then(result => {
  result.forEach(element => {
    UsersData.addAlbum(element);
  });
});

upload.getPhotos().then(result => {
  result.forEach(element => {
    UsersData.addPhoto(element);
  });
});


app.use('/', index);

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
