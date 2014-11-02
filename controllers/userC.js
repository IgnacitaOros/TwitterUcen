var mongoose = require('mongoose');
var User = mongoose.model('User');

//GET- obtiene todos los usuarios, hay que cambiar
exports.findAllUser = function(req, res){
	User.find(function(err, users){
		if(err) res.send(500, err.message);

		console.log('GET /users');
			res.status(200).jsonp(users);
	});
};

//GET BY ID

exports.findById = function(req, res){
	User.findById(req.params.id, function(err, users){
		if(err) return res.send(500, err.message);

		console.log('GET /user' + req.params.id);
			res.status(200).jsonp(users);
	});
};

//POST - Insertar un nuevo usuario

exports.addUser = function(req, res){
	console.log('POST');
	console.log(req.body);

	var user = new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		token: "holaaaaa"
	});

	user.save(function(err, user){
		if(err){
			res.send(500, err.message);
		}else{
			res.status(200).jsonp(user);
		}

		
	});
};

//PUT
exports.updateUser = function(req, res){
	User.findById(req.params.id, function(err, users){
		users.name = req.body.name;
		users.password = req.body.password;
		users.email = req.body.email;
		users.token = req.body.token;
		users.save(function(err){
			if(err) return res.send(500, err.message);
		res.status(200).jsonp(users);
		});
	});
};


//DELETE by id

exports.deleteUser = function(req, res){
	User.findById(req.params.id , function(err, users){
		users.remove(function(err){
			if(err) return res.send(500, err.message);
		res.status(200);
		});
	});
};

