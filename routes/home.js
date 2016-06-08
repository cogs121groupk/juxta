
exports.view = function(req, res) {
	var data;
    if(req.session.passport === undefined || Object.keys(req.session.passport).length === 0){
		data = {firstName: "User", lastName: "", pictureUrl: "../images/profilepic.png"};
		res.render("home",{users: data});
	}
	else{
		data = req.session.passport.user;
		res.render("home",{users: data});
	}
};