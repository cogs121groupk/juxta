var category = require('../category.json');
var nat = require('../unformated_data_nat.json');
var san = require('../unformated_data_san.json');

exports.getCategories = function(req, res) {
    res.json(category);
};

exports.getNatData = function(req, res) {
    res.json(nat);
};

exports.getSanData = function(req, res) {
    res.json(san);
};