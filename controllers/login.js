var crypto = require('crypto');
var rand = require('csprng');
var User = require('../models/user'); 
var gravatar = require('nodejs-gravatar');



exports.login = function(email,password,callback) {

	User.find(  {email: email},  function(err,users){
		
		if(users.length != 0){
			var temp = users[0].salt;
			var hash_db = users[0].password;
			var newpass = temp + password;
			var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
			//var grav_url = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
				
				if(hash_db==hashed_password){
				callback({'response':"Login Sucess",'res':true});
				}
				else{
					callback({'response':"Invalid Password",'res':false});
				}

		}

			else {
				callback({'response':"User not exist",'res':false});
				}
		});
	}

