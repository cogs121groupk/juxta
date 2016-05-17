const business_locations = require("../places_clean.json");

exports.view = function(req, res) {
    res.render("index");
};

exports.getBusinessLocationData = function(req, res){

	res.json(business_locations);
};