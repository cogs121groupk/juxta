exports.view = function(req, res){
	console.log(req.session.passport.user);
	res.render("industry",{user: req.session.passport.user});
}