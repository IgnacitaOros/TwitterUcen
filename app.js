var express = require("express");
var	app = express();
var	http = require('http');
var	bodyParser = require('body-parser');
var	methodOverride = require('method-override');
var	mongoose = require('mongoose');


if( process.env.NODE_ENV == "production"){

	mongoose.connect(process.env.MONGOLAB_URI, function(err, res){
	    if(err) throw err;
	    console.log('Connected to DB');
	});	

}else{
	mongoose.connect('mongodb://localhost/user', function(err, res){
	    if(err) throw err;
	    console.log('Connected to DB');
	});	
}


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

var models = require('./models/user')(app, mongoose);
var UserCtrl = require('./controllers/userC');

var router = express.Router();
router.get('/', function(req,res){
    res.send("Hello World!");
});

app.use(router);


var users = express.Router();

users.route('/user')
    .get(UserCtrl.findAllUser)
    .post(UserCtrl.addUser);

users.route('/user/:id')
    .get(UserCtrl.findById)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);

app.use('/', users);


app.listen(process.env.PORT || 3000, function(){
    console.log("node server running on http://localhost:3000");
});

// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


// module.exports = app;
