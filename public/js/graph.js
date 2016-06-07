$( document ).ready(function() {

    //start
        var result = {};
        var promise = getResult(result);

        promise.then(function(){
            console.log(result);

                var count = 0;
                var color = ["#FF6384",
                            "#4BC0C0",
                            "#FFCE56",
                            "#E7E9ED",
                            "#36A2EB"];
                            
                var ctx = document.getElementById("myChart");
                console.log("run@1");
                datasetResult = []
                for(var job in result){
                    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                    var datasetTemplate = {
                        label: job,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: hue,
                        borderColor: hue,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: hue,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: hue,
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 7,
                        pointBackgroundColor: hue,
                        pointHitRadius: 10,
                        data: result[job]
                    };

                    datasetResult.push(datasetTemplate);

                   // }
                   // else{
                   //  break;
                   // }
                   count+=10;
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
                        reponsive: true,
                        maintainAspectRatio: false,
                        title:{
                          display: true,
                          text: "Salary Trends, 2011-2015 ($ per year):",
                          fontSize: 35,
                          fontColor: "#FFFFFF"
                        },
                        scales:{
                          yAxes:[{
                            gridLines:{
                              lineWidth: 0.5,
                              color: "#FFFFFF"
                            },
                            ticks:{
                              fontSize: 20,
                              fontColor: "#FFFFFF"
                            }
                          }],
                          xAxes:[{
                            gridLines:{
                              lineWidth: 0.5,
                              color: "#FFFFFF"
                            },
                            ticks:{
                              fontSize: 35, 
                              fontColor: "#FFFFFF"
                            }
                          }]
                        },
                        legend:{
                            fullWidth:true,
                            position:"bottom",
                            labels:{
                                fontSize:35,
                                fontColor: "#FFFFFF"
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
                
                //loop through 2011-2015
                for(var year in data){
                   
                   var tmp = data[year][sessionData.industry];
                   for(var i = 0; i < tmp.length; i++){
                       if(resultTmp[tmp[i]["title"]] == undefined){
                            resultTmp[tmp[i]["title"]] = [];
                            resultTmp[tmp[i]["title"]].push(tmp[i]["annual_mean"]);
                       }
                       else{
                            resultTmp[tmp[i]["title"]].push(tmp[i]["annual_mean"]);
                       }

                   }
                   temp.push(data[year][sessionData.industry]);
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