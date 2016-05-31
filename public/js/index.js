$(document).ready(function() {
	// $.get('/getCategories', function(data){
	// 	console.log(data);
	// });
	$.get('/getNatData', function(data){
		console.log(data);
		console.log("true");
	});
	// $.get('/getSanData', function(data){
	// 	console.log(data);
	// });
	// $.get('/getUserData', function(data){
	// 	console.log(data);
	// });
	$(".choose-industry a").click(chooseIndustry);
	$(".sidebar-changeInd a").click(chooseIndustry);
	getIndustry();
});

function getIndustry(){
	$.get('/getIndustry', function(data){
		console.log(data);
	});
}

function chooseIndustry(e){
	var i = $(this).data("value");
	var json = { 'industry': i };
	$.post("/postIndustry", json);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}