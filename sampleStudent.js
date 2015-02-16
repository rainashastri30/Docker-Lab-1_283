var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
/*var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
*/
//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
app.listen(8080);

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

var Schema = mongoose.Schema;
var db = mongoose.connect('54.153.97.209:27017/students');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
   next();
});



var Student = new mongoose.Schema({
_id: {type:String},
student_id: {type:String},
student_name: {type:String}
});


var student = mongoose.model('students', Student); 
//console.log(Student);

app.get('/searchStudentById/:id', function(req, res, next){
//console.log("id is: "+req.params.id);
    student.find({student_id:req.params.id},function(err,docs){
        if(err){ return next(err); }
        res.json(docs);
    })
});

app.get('/searchStudentByName/:name', function(req, res, next){
    //console.log("id is: "+req.params.id);
    student.find({student_name:req.params.name},function(err,docs){
    //console.log("here");
        if(err){ return next(err); }
        res.json(docs);
        //var display = docs;
    })
});

app.get('/student', function(req, res, next){
    //console.log("id is: "+req.params.id);
    student.findOne(function(err,docs){
    //console.log("here");
        if(err){ return next(err); }
        res.json(docs);
        //var display = docs;
    })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        //console.log("Error Message1: "+err.message+"Error1: "+err);
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
    //console.log("Error Message2: "+err.message+"Error2: "+err);
});

//});
//module.exports = app;