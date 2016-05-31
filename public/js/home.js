$(document).ready(function() {
	// $.get('/getCategories', function(data){
	// 	console.log(data);
	// });
	$.get('/getNatData', function(data1){
		console.log(data1);
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
	});
	// $.get('/getSanData', function(data){
	// 	console.log(data);
	// });
	// $.get('/getUserData', function(data){
	// 	console.log(data);
	// });
});
