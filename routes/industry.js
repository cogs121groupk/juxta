exports.view = function(req, res){
	if(req.session.passport === undefined){
		var data = "";
	}
	else{
		var data = req.session.passport.user;
	}
	res.render("industry",{users: data});
}