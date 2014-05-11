var express = require('express');
var login_router = express.Router();
//var register = require('../config/register');
var login = require('../controllers/login');

//post
logeo = function(req, res){
var email = req.body.email; 
var pass = req.body.password; 
login.login(email, pass, function(found){
	console.log(found);
	res.json(found);
});
}

login_router.post("/", logeo); 

module.exports = login_router;




/*
registro = function(req, res){
	var email = req.body.email;
	var pass = req.body.password;
	var username = req.body.username;
	var image = req.body.image; 
	register.register(username, email, image, password function(found){
		console.log(found);
		res.json(found):  
	}); 

} 
*/

