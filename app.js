require('dotenv').config();
const express           = require('express');
const path              = require('path');
const logger            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const session           = require("express-session");
const passport          = require("passport");
const MongoStore        = require('connect-mongo')(session);
const authController    = require("./routes/auth-controller");
const index             = require('./routes/index');
const experiences       = require('./routes/experiences');
const academics         = require('./routes/academics');
const skills            = require('./routes/skills');
const extras            = require('./routes/extras');
const curriculums       = require('./routes/curriculums');
const message       = require('./routes/message');
const cors              = require('cors');
const mongoose          = require("mongoose");

mongoose.connect(process.env.MONGODB_URI).then(() =>{
  console.log(`Connected to DB: ${process.env.MONGODB_URI}`);
});

var app = express();

var whitelist = [
    'http://localhost:4200',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({limit: '10mb', extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport config
app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());



app.use('/', index);
app.use('/', authController);
app.use('/skills', skills);
app.use('/experiences', experiences);
app.use('/academics', academics);
app.use('/extras', extras);
app.use('/curriculums', curriculums);
app.use('/message', message);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.all('/*', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
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
