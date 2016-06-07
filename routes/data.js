var category = require('../category.json');
var san = require('../unformated_data_san.json');
var sanDiegoCompanies = require('../sd_companies.json');

exports.getUserData = function(req, res){
	var data = req.user || {};
	res.json(data);
}

exports.getCategories = function(req, res) {
    res.json(category);
};

exports.getSanData = function(req, res) {
    res.json(san);
};

exports.getIndustry = function(req, res) {
	// delete req.session.industry; //testing
	// console.log(req.session.industry);
	data = {};
	data.industry = req.session.industry; // will be undefined if none set
	data.location = req.session.location; // will be undefined if none set
	res.json(data);
}

exports.postIndustry = function(req, res) {
	var data = req.body;
	// console.log(data);
	req.session.industry = data.industry;
	req.session.location = data.location;
	console.log(req.session.industry);
	console.log(req.session.location);
	res.send("got industry");
}

exports.getSanDiegoCompanies = function(req, res){
	res.json(sanDiegoCompanies);
}