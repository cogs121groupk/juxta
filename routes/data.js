var category = require('../category.json');
var san = require('../unformated_data_san.json');
var sanDiegoCompanies = require('../unformated_companies_glassdoor_sd.json');
var http = require("http");
var async = require("async");

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
	data.industry = req.session.industry == undefined ? "Computer and Mathematical Occupations" : req.session.industry; // will be undefined if none set
	data.location = req.session.location == undefined ? "San Diego" : req.session.location; // will be undefined if none set
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

exports.compareCompanies = function(req, res){

	var c0 = req.query.c0.replace(/ /g,"%20");
	var c1 = req.query.c1.replace(/ /g,"%20");
	var c2 = req.query.c2.replace(/ /g,"%20");
	var c3 = req.query.c3.replace(/ /g,"%20");
	var c4 = req.query.c4.replace(/ /g,"%20");
	var c5 = req.query.c5.replace(/ /g,"%20");

	var ret = [c0, c1, c2, c3, c4, c5];

	var data = [];

	async.each(ret, function(company, callback1){

		var options = {
			host: "api.glassdoor.com",
			path: "/api/api.htm?t.p=70298&t.k=evpUge9Yz1q&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q="+company
		}

		callback = function(response){

			var str = '';

			response.on('data', function(chunk){
				str += chunk;
			});

			response.on('end', function(){

				var result = JSON.parse(str);

				for(var i = 0; i < result.response.employers.length; i++){
					if(result.response.employers[i].name == company.replace(/%20/g, " ")){
						data.push(result.response.employers[i]);
					}
				}
				callback1();
			});
		}

		if(company != "")
			http.request(options, callback).end();
		else
			callback1();

	}, function(err){

		console.log(data.length);
		return res.json(data);
	});
}