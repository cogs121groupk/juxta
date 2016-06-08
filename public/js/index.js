
$(document).ready(function() {
	// $.get('/getCategories', function(data){
	// 	console.log(data);
	// });
	$.get('/getSanData', function(data){
		console.log(data);
	});
	// $.get('/getUserData', function(data){
	// 	console.log(data);
	// });
	$("#submit").click(chooseIndustry);
	$("#submit-side").click(chooseIndustrySide);
	getIndustry();
});

function getIndustry(){
	$.get('/getIndustry', function(data){
		console.log(data);
	});
}

function chooseIndustry(e){
	// var i = $('.choose-industry a').data("value");
	// var l = $('.choose-location a').data("value");
	var i = $('#industry-select').val();
	var l = $('#location-select').val();
	var json = { 'industry': i,
				 'location': l };
	console.log(json);
	$.post("/postIndustry", json, function(){
		window.location.href = "/home";
	});
}

function chooseIndustrySide(e){
	// var i = $('.choose-industry a').data("value");
	// var l = $('.choose-location a').data("value");
	var i = $('#industry-select-side').val();
	var l = $('#location-select-side').val();
	var json = { 'industry': i,
				 'location': l };
	console.log(json);
	$.post("/postIndustry", json, function(){
		//window.location.href = "/home";
		alert("Changed Industry to "+json.industry);
	});
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