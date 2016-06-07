
exports.view = function(req, res) {
	console.log(req.session.passport.user);
    res.render("home", {users: req.session.passport.user});
};