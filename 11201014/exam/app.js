var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
// var db = mongoose.connect('mongodb://root:root@localhost:27017/blood_donors');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function() {
  var userSchema = new mongoose.Schema({
    Name: String,
    Age: String,
    Designation: String,
    Department: String,
    Email: String,
    image: Image
    // created: { type: Date, default: Date.now}
  });

  user = mongoose.model('User', userSchema);
  app.use('/users', user);
});

mongoose.connect('mongodb://localhost:27017/exam');
//var db = Mongoose.createConnection('localhost', 'blood_donors');
// var Schema = mongoose.Schema;
//var mongo = require('./mongo');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var routes = require('./routes/index');
//var user = require('./routes/users');
//router = require('./routes/users');
//var models = require('./models');
// var userService = require('./services/user-service');
var app = express();
//router = require('../users.js');
//User = require('./models/user');
//app.models = require('./models/index');
//app.models = require('./models/user');
//app.use(express.bodyParser());

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(express.methodOverride());
//app.use(app.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/', router);



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/*
var userSchema = new Schema({
  
  _id: {type: String, required: 'Please enter your email'}, 
  firstName: {type: String, required: 'Please enter your first name'},
  lastName: {type: String, required: 'Please enter your last name'},
  address: {type: String, required: 'Please enter your address'},
  bloodGroup: {type: String, required: 'Please enter your Blood Group'},
  Phone: {type: String, required: 'Please enter your Phone Number'},
  password: {type: String, required: 'Please enter your password'},
  created: {type: Date, default: Date.now}
});
*/
/**
userSchema.path('email').validate(function(value, next) {
  userService.findUser(value, function(err, user) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!user);
  });
}, 'That email is already in use');
*/
 //var user = mongoose.model('User', User);

 app.get('/user', function(req, res){
  db.user.find({},{Name:1,Age:1,email:1,Department:1}, function(err, docs){
    if(err) res.json(err);
    else    res.render('user', docs);
  });
});

app.post('/users',function(req,res){
  //console.log('hello');
   new user({
   Name: req.body.Name,
    Age: req.body.Age,
    Designation: req.body.Designation,
    Department: req.body.Department,
    Email: req.body.Email,
    image: req.body.image
  
/**
createUser(firstName,lastName,address,bloodGroup,Phone,email, password function(err, user){
    if (err) {
      res.render('index', {error: err});
    } else {
      
      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;
      
      res.redirect('/');  
    }
  });
**/
   }).save(function(err, doc){
         if(err) res.json(err);
         //else    res.redirect('/view');
         else res.send("successful");
   });

/**
var stu = new user({
  firstName: "String",
  lastName: "String",
  address: "String",
  bloodGroup: "String",
  Phone: "String",
  email: "String",
  password: "String"
});

stu.save(function(err, doc){
        if(err) res.json(err);
        //else    res.redirect('/view');
        else res.send("successful");
  });
*/
});
/**
function authenticateUser(email, password, callback){
  var coll = mongo.collection('User');
  
  coll.findOne({email:email, password:password}, function(err, user){
    callback(err, user);
  });
}
*/
/**
app.post('/login', function(req, res){
  console.log('in /login');
  // These two variables come from the form on
  // the views/login.hbs page
  var email = req.body.email;
  var password = req.body.password;
  
  authenticateUser(email, password, function(err, user){
    if (user) {
      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;

      res.redirect('/');
    } else {
      res.render('login', {badCredentials: true});
    }
  });
});
*/
 // User.virtual('password')
 //    .set(function(password) {
 //      this._password = password;
 //      this.salt = this.makeSalt();
 //      this.hashed_password = this.encryptPassword(password);
 //    })
 //    .get(function() { return this._password; });

 //  User.method('authenticate', function(plainText) {
 //    return this.encryptPassword(plainText) === this.password;
 //  });

 //  User.method('makeSalt', function() {
 //    return Math.round((new Date().valueOf() * Math.random())) + '';
 //  });

 //  User.method('encryptPassword', function(password) {
 //    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
 //  });

 //  User.pre('save', function(next) {
 //    if (!validatePresenceOf(this.password)) {
 //      next(new Error('Invalid password'));
 //    } else {
 //      next();
 //    }
 //  });

// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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
if(db){
   console.log('Mongo DB connection established....');
}

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
//module.exports = user;
// });