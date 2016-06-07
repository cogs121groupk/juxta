// var items =[{name: "Albatross", inner: "Good Company"}, {name: "AirBnB", inner: "Good Company"} ,{name: "Banister", inner: "Good Company"},
// 			{name: "Cisco", inner: "Good Company"},{name: "Classy", inner: "Good Company"},{name: "Costco", inner: "Heaven"},
// 			{name: "Dinero", inner: "Good Company"},{name: "E-Surance", inner: "Good Company"}, {name: "Facebook", inner: "Good Company"},
// 			{name: "GlassDoor", inner: "Transparent"},{name: "Google", inner: "Good Company"},{name: "Haswell", inner: "Good Company"}];


var items = [];

var one = 0;

var two = 0;

var compare = [];

$(document).ready(function(){

	$.get("/getSanDiegoCompanies", function(data){
		// for(var i = 0; i < data.employers.length; i++){
		// 	console.log(data.employers[i]);
		// }

		items = data;

		var pic;

		for(var h = 0; h < items.length; h++){

			if(h < 5){
				one = 1;
			}
			else if(h < 10){
				one = 2;
			}
			else if(h < 15){
				one = 3;
			}

			if(items[h].squareLogo == ""){
				pic = "http://downloadicons.net/sites/default/files/question-mark-logo-icon-76440.png";
			}
			else{
				pic = items[h].squareLogo;
			}

			var tile = "<div class = 'compTile'><div id='overlay' onclick = 'addToCompare(\"" + items[h].name + "\")'><span id='plus'>+</span></div><image class = 'compimg' src = "+pic+"><h3 class = 'compname'>"+items[h].name+"</h3><p></p></div></div>";//+items[h].inner+"</p></div></div>";

			$("#row"+one).append(tile);

			one = 0;
		}

	});
});


$('#search').bind('input',function(){

	$("#row1").empty();
	$("#row2").empty();
	$("#row3").empty();

    var search = $(this).val().toLowerCase();

    //if you only want to match id- as prefix 
	var matches = items.filter(function(windowValue){
	  if(windowValue) {
	    return(windowValue.name.toLowerCase().substring(0, search.length) === search);
	  }
	});

	console.log(matches);

	if(matches.length == 0){

		$("#row1").append("<h2>Oops, no results found!</h1>");
	}

	else{

		for(var i = 0; i < matches.length; i++){
			if(i < 5){
				two = 1;
			}
			else if(i < 10){
				two = 2;
			}
			else if(i < 15){
				two = 3;
			}

			var pic;

			if(matches[i].squareLogo == ""){
				pic = "http://downloadicons.net/sites/default/files/question-mark-logo-icon-76440.png";
			}
			else{
				pic = matches[i].squareLogo;
			}

			var tile = "<div class = 'compTile'><div id='overlay' onclick = 'addToCompare(\"" + matches[i].name + "\")'><span id='plus'>+</span></div><image class = 'compimg' src = "+pic+"><h3 class = 'compname'>"+matches[i].name+"</h3><p></p></div></div>";

			$("#row"+two).append(tile);//+matches[i].inner+"</p></div></div>");
			two = 0;
		}
	}
});

function addToCompare(name){

	if(compare.length == 6){
		alert("Can only compare 6 companies sorry :(");
		return 0;
	}

	for(var j = 0; j < compare.length; j++){

		if(compare[j].name == name){
			alert("You already have "+ name + " ready to compare!");
			return 0;
		}
	}

	for(var i = 0; i < items.length; i++){

		if(items[i].name == name){
			compare.push(items[i]);
		}
	}

	$("#compare").empty();

	$("#compare").append("<h3>To Compare:</h3>");

	for(var z = 0; z < compare.length; z++){
		var cart = "<div class = 'compareRow'><h4>"+compare[z].name+"<span class = 'delete' onclick = 'removeFromCompare(\"" + compare[z].name + "\")'> (X) </span></h4></div>";
		$("#compare").append(cart);
	}

	$("#compare").append("<button onclick = 'scroll()' id = 'compareButton'> Compare! </button");
}

function removeFromCompare(name){

	for(var i = 0; i < compare.length; i++){
		if(compare[i].name == name){
			compare.splice(i, 1);
		}
	}

	$("#compare").empty();

	$("#compare").append("<h3>To Compare:</h3>");

	for(var z = 0; z < compare.length; z++){
		var cart = "<div class = 'compareRow'><h4>"+compare[z].name+"<span class = 'delete' onclick = 'removeFromCompare(\"" + compare[z].name + "\")'> (X) </span></h4></div>";
		$("#compare").append(cart);
	}

	$("#compare").append("<button onclick = 'scroll()' id = 'compareButton'> Compare! </button");


}

function scroll(){

	$("#space").css("display", "block");

	var min = 2.5;

	var max = 4.8;

	var compare1 = [];

	for(var i = 0; i < compare.length; i++){
		compare1[i] = compare[i];
	}

	for(var i = compare.length; i < 6; i++){
		compare1[i] = {name: ""};
	}

	var queryString = "/compareCompanies?c0="+compare1[0].name+"&c1="+compare1[1].name+"&c2="+compare1[2].name+"&c3="+compare1[3].name+"&c4="+compare1[4].name+"&c5="+compare1[5].name;

	console.log(queryString);

	$.get(queryString, function(compare){
		for (var i =1; i<=6; i++){
			document.getElementById("comp"+i+"div").innerHTML = "<canvas id = 'comp"+i+"' width = '400' height = '400'></canvas>";
			$("#comp"+i+"div").css("display", "block");
		}

		if(compare.length > 0){
			var backgroundColor = ['rgba(255, 99, 132, 0.5)', 'rgba(157, 230, 147, 0.5)', 'rgba(15, 82, 168, 0.5)',
			'rgba(85, 210, 230, 0.5)','rgba(255, 157, 0, 0.5)', 'rgba(231, 27, 242, 0.5)'];
			var bpColors = ['rgba(255, 99, 132, 0.9)', 'rgba(157, 230, 147, 0.9)', 'rgba(15, 82, 168, 0.9)',
			'rgba(85, 210, 230, 0.9)', 'rgba(255, 157, 0, 0.9)', 'rgba(231, 27, 242, 0.9)'];
			for(var i=0; i<compare.length; i++)
			{
				compare[i].ceo.pctApprove = compare[i].ceo.pctApprove < 0 ? 0 : compare[i].ceo.pctApprove;
				var data = {
					labels: ["Overall Rating", "CEO", "Culture	", "Work Life Balance", "Leadership", "Compensation"],
				    datasets: [{
				        label: compare[i].name,
				        data: [compare[i].overallRating, compare[i].ceo.pctApprove/20, compare[i].cultureAndValuesRating, compare[i].workLifeBalanceRating, compare[i].seniorLeadershipRating, compare[i].compensationAndBenefitsRating],
				        backgroundColor: backgroundColor[i],
				        borderWidth: 4,
				        borderColor: bpColors[i],
				        pointBackgroundColor: bpColors[i],
				        pointRadius: 7,
				        pointHoverRadius: 9
				    },
				    {
				    	label: "Average",
				    	data: [4.0, 3.0, 2.5, 2.5, 2.5, 2.5],
				    	backgroundColor: 'rgba(128, 128, 128, .5)',
				    	borderWidth: 4,
				        borderColor: 'rgba(128, 128, 128, .9)',
				        pointBackgroundColor: 'rgba(128, 128, 128, .9)',
				        pointRadius: 7,
				        pointHoverRadius: 9
				    }]
				};
				var plFont =  $(document).width() >=1980 &&  $(document).height() >=1080 ? 20 : 12;
				var tickFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 30 : 22;
				var legendFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 30 : 18;
				var titleFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 27 : 19;
				var options = {
					scale:{
						pointLabels:{
							fontSize: plFont,
							fontColor: 'rgba(255, 255, 255, 0.9)'
						},
						ticks:{
							beginAtZero: true,
							max: 5.0,
							fontSize: tickFont,
							fontColor: 'rgba(255, 255, 255, 0.9)',
							backdropColor: 'rgba(0, 0, 0, 1)'
						},
						gridLines:{
							color: 'rgba(255, 255, 255, .99)'
						}
					},
					legend: {
						labels:{
							fontColor: 'rgba(255, 255, 255, 0.9)',
							fontSize: legendFont,
							padding: 0
						}
					},
					title:{
						fontSize: titleFont
					},
					pointLabel:{
						fontSize: plFont,
						fontColor: 'rgba(255, 255, 255, 0.9)'
					}
				};

				var ctx = document.getElementById("comp"+(i+1));
				var myChart = new Chart(ctx, {
					type: 'radar',
					data: data,
					options: options
				});
			}
		}

		for (var i = compare.length; i<6; i++){
			$("#comp"+(i+1)+"div").css("display", "none");
		}

	});

	$('html, body').animate({ 
	   scrollTop: $(document).height()-$(window).height()}, 
	   1400
	);
}