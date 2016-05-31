function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}



// var Chart = $.getScript("../node_modules/chart.js/dist/Chart.min.js, function(){

//    alert("Script loaded but not necessarily executed.");

 //});
//  var Chart = require("../node_modules/chart.js");
// $(document).ready(function() {
	// $.get('/getCategories', function(data){
	// 	console.log(data);
	// });
//     $.getJSON("../unformated_data_nat.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

var drawChart = function(){ 
    var Chart = $.getScript("../node_modules/chart.js/dist/Chart.min.js", function(){

});
	$.get('/getNatData', function(data){
		console.log(data);
        console.log("yes");

		var ctx = document.getElementById("myChart");
	var data = {
    labels: ["2011", "2012", "2013", "2014", "2015"],
    datasets: [
        {
            label: "Industry trend",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};
//new Chart(ctx).Line(data);
var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        xAxes: [{
            display: false
        }]
    }
});
	//});
	// $.get('/getSanData', function(data){
	// 	console.log(data);
	// });
	// $.get('/getUserData', function(data){
	// 	console.log(data);
	// });
});
};
