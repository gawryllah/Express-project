var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const userRouter = require('./routes/userRoute');
const gameRouter = require('./routes/gameRoute');
const profileRouter = require('./routes/profileRoute');


const sequelizeInit = require("./config/sequelize/init");
const userApiRouter = require("./routes/api/UserApiRoute");
const gameApiRouter = require("./routes/api/GameApiRoute");
const profileApiRouter = require("./routes/api/ProfileApiRoute");

const authUtils = require('./util/authUtils');






var app = express();

app.use(bodyParser.json())

app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {

  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});

sequelizeInit().catch((err) => {
  console.log(err);
});





app.use("/api/users",  userApiRouter);
app.use("/api/games",  gameApiRouter);
app.use("/api/profiles",  profileApiRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/users',authUtils.permitAuthenticatedUser, userRouter)
app.use('/games',authUtils.permitAuthenticatedUser, gameRouter)
app.use('/profiles', authUtils.permitAuthenticatedUser, profileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
