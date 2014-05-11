

var express = require('express');
var user_router = express.Router();

//module.exports = function(app){
/*
router.get('/local', function(req, res) {
  res.send('respond with a resource');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/emppresa_distribudora');

var User = mongoose.model('Users', { name: String });

*/ 

//var User= require("./users.js"); 

/*router.get('/listarusers', findAllUser= function(req, res){
		//res.send("exito");
		User.find( function(err, users){
		
			if(!err) res.send(users); 
			else console.log("EROR "+err ); 
		}); 
	}
);

*/

var User = require('../models/user.js'); 
var rand = require('csprng');
var temp =rand(160, 36);
var crypto = require('crypto');
	
//GET retorna todas los usuarios
findAllUser = function(req,res){
	 console.log("GET - /users");
	 return User.find(function(err, users){
			if(!err){
				res.send(users); 
			} else {
				res.statusCode = 500
				console.log("EROR "+err ); 
				return res.send({
					error : 'Server error' 
				}); 
			}
		}); 
};

//GET retorna un usurio por ID 
findByID = function(req, res){
	console.log("GET - /users/:id"); 
	return User.findById (req.params.id, function(err, users){
			if(!users) {
				res.statusCode = 404;
        		return res.send({ error: 'Not found' });
				res.send(users); 
			}
			if(!err){
				return res.send({ status: 'OK', usuario:usuario });
			}				
			else {
				res.statusCode = 500;
        		console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
};


//POST agregamos un nuevo usuario
addUsers = function(req, res){
	console.log('POST - /users/new');
    console.log(req.body);

    var temp =rand(160, 36);
	var newpass = temp +  req.body.password;	
	var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
    

    var usuario = new User({
			username : req.body.username,
			email    : req.body.email,
			image    : req.body.image,
			password : hashed_password,
			salt : temp
		});

    usuario.save(function(err){
			if(!err){
				console.log("usuarios guardados"); 
				  return res.send({ status: 'OK', usuario:usuario });
			} 
			else {				
		        console.log(err);
		        if(err.name == 'ValidationError') {
		          res.statusCode = 400;
		          res.send({ error: err });
		        } else {
		          res.statusCode = 500;
		          res.send({ error: 'Server error' });
		        }
		        console.log('Internal error(%d): %s',res.statusCode,err.message);
			}
		}); 
};



//PUT actualizamos  un usuario
updateUsers = function(req, res){
	res.send("This is not implemented now"); 
};

//DELETE eliminamos un usario 
deleteUsers = function(req, res){
	res.send("This is not implemented now");
};

	//link de los routers y funciones 
	user_router.get("/" , findAllUser); 
	user_router.get("/find/:id" , findByID); 
	user_router.post('/new', addUsers); 
	user_router.put("/update/:id", updateUsers);
	user_router.delete("/delete/:id", deleteUsers);  


module.exports = user_router;

//} 