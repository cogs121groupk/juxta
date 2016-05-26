var items =[{name: "Albatross", inner: "Good Company"}, {name: "AirBnB", inner: "Good Company"} ,{name: "Banister", inner: "Good Company"},
			{name: "Cisco", inner: "Good Company"},{name: "Classy", inner: "Good Company"},{name: "Costco", inner: "Heaven"},
			{name: "Dinero", inner: "Good Company"},{name: "E-Surance", inner: "Good Company"}, {name: "Facebook", inner: "Good Company"},
			{name: "GlassDoor", inner: "Transparent"},{name: "Google", inner: "Good Company"},{name: "Haswell", inner: "Good Company"}];

var one = 0;

var two = 0;

var compare = [];

for(var h = 0; h < items.length; h++){

	if(h < 4){
		one = 1;
	}
	else if(h < 8){
		one = 2;
	}
	else if(h < 12){
		one = 3;
	}

	var tile = "<div class = 'compTile'><div id='overlay' onclick = 'addToCompare(\"" + items[h].name + "\")'><span id='plus'>+</span></div><h3>"+items[h].name+"</h3><p>"+items[h].inner+"</p></div></div>";

	$("#row"+one).append(tile);

	one = 0;
}


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
			if(i < 4){
				two = 1;
			}
			else if(i < 8){
				two = 2;
			}
			else if(i < 12){
				two = 3;
			}

			$("#row"+two).append("<div class = 'compTile'><div id='overlay' onclick = 'addToCompare(\"" + matches[i].name + "\")'><span id='plus'>+</span></div><h3>"+matches[i].name+"</h3><p>"+matches[i].inner+"</p></div></div>");
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

	$('html, body').animate({ 
	   scrollTop: $(document).height()-$(window).height()}, 
	   1400, 
	   "easeOutQuint"
	);
}