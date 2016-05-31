$( document ).ready(function() {
	// $.get('/getCategories', function(data){
	// 	console.log(data);
	// });
	$.get('/getNatData', function(data){
		var industry = "Architecture and Engineering Occupations";
		//[5]->2011->[35]->obj of jobs
		var result = {};
		var temp = [];
		
        
		console.log(data);
		console.log("true");
		
		//loop through 2011-2015
        for(var year in data){
          
           temp.push(data[year][industry]);
           console.log(data[year][industry]);
        }
        console.log(temp);
       
        //loop through jobs in 2011
        //since jobs are the same for diff years
		for(var i = 0; i < 35; i++){
			//job lists of 2011
			var arr = temp[0];
			//arr[i]->the first job obj
			//each job title
			var job_title = arr[i]["title"];
			//add job obj in result
			result[job_title] = [];
			//the array of each job title is the list of salary in 5 yrs
			var pay_arr = result[job_title];
			//add salary for each job
			for (var j = 0; j < 5; j++){
                pay_arr.push(temp[j][i]["annual_mean"]);
			}
			console.log(job_title);

			console.log(pay_arr);
			console.log(result);
			
		}
		// for(var key in data){
		// 	//2011,2012,2013...
		// console.log(key);	
  //         for(var key1 in data[key]){
  //         	//industry
  //         	console.log(key1);
  //         }
		// } 
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