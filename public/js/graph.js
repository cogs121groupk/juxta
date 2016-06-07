$( document ).ready(function() {

    //start
    $.get('/getCategories', function(data){
        console.log(data);
    });
        var result = {};
        var promise = getResult(result);

    // $.get('/getSanData', function(data){
    //  var industry = "Architecture and Engineering Occupations";
    //  //[5]->2011->[35]->obj of jobs
        
        
        
    //  console.log(data);
    //  //console.log("true");
        
    //  //loop through 2011-2015
 //        for(var year in data){
          
 //           temp.push(data[year][industry]);
 //           console.log(data[year][industry]);
 //        }
 //        console.log(temp);
       
 //        //loop through jobs in 2011
 //        //since jobs are the same for diff years
    //  for(var i = 0; i < 35; i++){
    //      //job lists of 2011
    //      var arr = temp[0];
    //      //arr[i]->the first job obj
    //      //each job title
    //      var job_title = arr[i]["title"];
    //      //add job obj in result
    //      result[job_title] = [];
    //      //the array of each job title is the list of salary in 5 yrs
    //      var pay_arr = result[job_title];
    //      //add salary for each job
    //      for (var j = 0; j < 5; j++){
    //          var salary = "annual_mean";
    //          console.log(temp[j][i][salary]);
 //                pay_arr.push(temp[j][i][salary]);
    //      }
    //      console.log(job_title);

    //      console.log(pay_arr);
    //      console.log(result);

            
    //  }
    


        // for(var key in data){
        //  //2011,2012,2013...
        // console.log(key);    
  //         for(var key1 in data[key]){
  //            //industry
  //            console.log(key1);
  //         }
        // } 
        promise.then(function(){
            console.log(result);
            //var Chart = $.getScript("../node_modules/chart.js/dist/Chart.min.js", function(){

                var count = 0;
                var color = ["#FF6384",
                            "#4BC0C0",
                            "#FFCE56",
                            "#E7E9ED",
                            "#36A2EB"];
                            
                var color = ["#FF6384",
                            "#4BC0C0",
                            "#FFCE56",
                            "#E7E9ED",
                            "#36A2EB"];
                var ctx = document.getElementById("myChart");
                console.log("run@1");
                datasetResult = []
                for(var job in result){
                    if(count < 5){
                    var datasetTemplate = {
                        label: job,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: color[count],
                        borderColor: color[count],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: color[count],
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: color[count],
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: result[job]
                    };

                    datasetResult.push(datasetTemplate);

                   }
                   else{
                    break;
                   }
                   count++;
                }
                var data = {
                    labels: ["2011", "2012", "2013", "2014", "2015"],
                    datasets: datasetResult
                  };

                  console.log("graph");
                  console.log(data);

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        legend:{
                            fullWidth:true,
                            position:"bottom",
                            labels:{
                                fontSize:8
                            }
                        },
                        xAxes: [{
                            display: false
                        }]
                    }
                });
        //  });
        });




    $(".choose-industry a").click(chooseIndustry);
    $(".sidebar-changeInd a").click(chooseIndustry);
    getIndustry();
});


function getResult(result){
      return new Promise(function(resolve, reject){
        $.get('/getIndustry', function(sessionData){
            //const industry = sessionData.industry;
            console.log(sessionData.industry);
            $.get('/getSanData', function(data){
                var temp = []
                var resultTmp = {}
                var industry = "Architecture and Engineering Occupations";
                
                //loop through 2011-2015
                for(var year in data){
                   
                   var tmp = data[year][industry];
                   for(var i = 0; i < tmp.length; i++){
                       if(resultTmp[tmp[i]["title"]] == undefined){
                            resultTmp[tmp[i]["title"]] = [];
                            resultTmp[tmp[i]["title"]].push(tmp[i]["annual_mean"]);
                       }
                       else{
                            resultTmp[tmp[i]["title"]].push(tmp[i]["annual_mean"]);
                       }

                   }
                   temp.push(data[year][industry]);
                   //console.log(year);
                  //console.log(data[year][industry]);

                }
                for(var job in resultTmp){
                    if(resultTmp[job].length == 5){
                        result[job] = resultTmp[job];
                    }

                }
                //console.log(result);
              
                 resolve();
              });
        });
        
   });



}