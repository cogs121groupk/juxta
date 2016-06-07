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
			           'rgba(60, 189, 232, 0.4)',
			           'rgba(252, 74, 20, 0.4)',
			           'rgba(56, 242, 39, 0.4)',
			           'rgba(242, 229, 39, 0.4)',
			           'rgba(158, 84, 227, 0.4)'
			    	],
		    	borderColor: [
						'rgba(60, 189, 232, 1)',
						'rgba(252, 74, 20, 1)',
						'rgba(56, 242, 39, 1)',
						'rgba(242, 229, 39, 1)',
						'rgba(158, 84, 227, 1)'
		    	],
		    }],
		    labels: dataLabel
		};

		var chart = new Chart(ctx, {
		    data: data,
		    type: 'polarArea',
		    options: {
		    	legend: {
		    		position: 'bottom',
		    		fullWidth: true,
		    		labels:{
		    			fontSize: 25,
		    			fontColor: "#ffffff"
		    		}
		    	},
		    	title:{
		    		display: true,
		    		text: "Computers and Mathematics",
		    		fontSize: 35,
		    		fontColor: "#FFFFFF"
		    	},
		        scale:{
			        gridLines:{
			        	color: "#FFFFFF"
			        },
			        ticks:{
			        	beginAtZero: true,
			        	fontSize: 30
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