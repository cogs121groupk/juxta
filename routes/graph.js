// const nat_json = require("../unformatted_data_nat.json");
exports.view = function(req, res) {
    res.render("graph");
};
// exports.getNatData = function(req, res){
// 	//var time = req.query.time;
// 	var data = [];
// 	nat_json.forEach(function(year){
// 		var num = nat_json[2015][Arts, Design, Entertainment, Sports, and Media Occupations][0].annual_mean;
// 		 if (err) {
//           console.log(err);
//            return;
//        }
//         console.log("Data", data);
// 		//new Date(crime.activity_date);
// 		//if(date.getHours() == time){
// 		//	data.push(crime);
// 		//}
// 	});
// 	res.json(data);
// }