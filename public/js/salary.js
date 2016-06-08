$(document).ready(function(){

	var dataLabel = [];
	var dataSalary = [];

	var industry;

	function getPromise() {
		return new Promise(function(resolve, reject){
			$.get('/getIndustry', function(sessionData){
				$.get('/getSanData', function(data){
					var result = data[2015][sessionData.industry];
					industry = sessionData.industry;
					console.log(result);
					function compare(a,b) {
				      if (Number(a.annual_mean) > Number(b.annual_mean))
				        return -1;
				      else if (Number(a.annual_mean) < Number(b.annual_mean))
				        return 1;
				      else 
				        return 0;
				    }
				    result.sort(compare);

				    for (var i=0; i < 5 && i < result.length; i++){
				    	dataLabel.push(truncate(result[i].title, 27));
				    	dataSalary.push(result[i].annual_mean);
				    }

				    resolve();
				});
			});
		});
	}

	var promise = getPromise();
	promise.then(function(){
		var ctx = document.getElementById("topSalary");

		var data = {
		    datasets: [{
		        data: dataSalary,
		        backgroundColor: [
			           "rgba(255, 99, 132, 0.70)",
						"rgba(75, 192, 192, 0.70)",
						"rgba(255, 206, 86, 0.70)",
						"rgba(231, 233, 237, 0.70)",
						"rgba(54, 162, 235, 0.70)"
			    	],
		    	borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(231, 233, 237, 1)",
						"rgba(54, 162, 235, 1)"
		    	],
		    }],
		    labels: dataLabel
		};

		var legendFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 25 : 15;
    	var titleFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 35 : 25;
    	var scaleFont =  $(document).width() >=1980 &&  $(document).height() >=1080 ? 30 : 20;
		var chart = new Chart(ctx, {
		    data: data,
		    type: 'polarArea',
		    options: {
		    	legend: {
		    		position: 'bottom',
		    		fullWidth: true,
		    		labels:{
		    			fontSize: legendFont,
		    			fontColor: "#ffffff"
		    		}
		    	},
		    	title:{
		    		display: true,
		    		text: "Computers and Mathematics",
		    		fontSize: titleFont,
		    		fontColor: "#FFFFFF"
		    	},
		        scale:{
			        gridLines:{
			        	color: "#FFFFFF"
			        },
			        ticks:{
			        	beginAtZero: true,
			        	fontSize: scaleFont
			        }
			    }
    		}
		});
	});

});

function truncate( word, n ){
    if (word.length > n)
        word = word.substring(0,n)+"...";
    return word;
};