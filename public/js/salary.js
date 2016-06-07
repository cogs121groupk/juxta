$(document).ready(function(){

	var dataLabel = [];
	var dataSalary = [];
	function getPromise() {
		return new Promise(function(resolve, reject){
			$.get('/getIndustry', function(sessionData){
				$.get('/getSanData', function(data){
					var result = data[2015][sessionData.industry];
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
				    	dataLabel.push(result[i].title);
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
		            "#FF6384",
		            "#4BC0C0",
		            "#FFCE56",
		            "#E7E9ED",
		            "#36A2EB"
		        ],
		        label: 'Top 5 paying Salaries' // for legend
		    }],
		    labels: dataLabel
		};

		var chart = new Chart(ctx, {
		    data: data,
		    type: 'polarArea',
		    options: {
		        elements: {
		            arc: {
		                borderColor: "#000000"
		            }
		        }
    		}
		});
	});

});