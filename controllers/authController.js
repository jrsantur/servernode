var passport = require('passport');

var AuthController = {


	 // Login a user 
    login: passport.authenticate('local', {
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/login/failure'
    }),

	//on login success calback 
	loginSuccess : function(req, res){
		res.json({
			success : true, 
			user : req.sessions.passport.user
		});
	},
	loginFailure : function(req, res){
		res.json({
			success : false, 
			message : 'Invalid username or password'
		});
	},

	//log out a user 
	logout : function(req , res){
		req.logout(); 
		res.end(); 
	},
};
exports = module.exports = AuthController;