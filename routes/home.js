
exports.view = function(req, res) {
    if(req.session.passport === undefined){
		var data = {firstName: "User", lastName: "", pictureUrl: "../images/profilepic.png"};
	}
	else{
		var data = req.session.passport.user;
	}
	res.render("home",{users: data});
};