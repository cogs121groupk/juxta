$( document ).ready(function() {

    //start
        var result = {};
        var promise = getResult(result);

        promise.then(function(){
            console.log(result);

                var count = 0;
                var color = [
                  "rgba(255, 99, 132, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(231, 233, 237, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(243, 129, 129, 1)",
                  "rgba(252, 227, 138, 1)",
                  "rgba(234, 255, 208, 1)",
                  "rgba(149, 225, 211, 1)",
                  "rgba(255, 154, 0, 1)",
                  "rgba(62, 193, 211, 1)",
                  "rgba(180, 241, 241, 1)",
                  "rgba(255, 200, 200, 1)",
                  "rgba(237, 247, 152, 1)",
                  "rgba(155, 223, 70, 1)",
                  "rgba(228, 241, 254, 1)"
                ]
                            
                var ctx = document.getElementById("myChart");
                console.log("run@1");
                datasetResult = []
                for(var job in result){
                    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
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
                        pointRadius: 7,
                        pointBackgroundColor: color[count],
                        pointHitRadius: 10,
                        data: result[job]
                    };

                    datasetResult.push(datasetTemplate);

                   // }
                   // else{
                   //  break;
                   // }
                   count = (++count) % Object.keys(result).length;
                }
                var data = {
                    labels: ["2011", "2012", "2013", "2014", "2015"],
                    datasets: datasetResult
                  };

                  console.log("graph");
                  console.log(data);

                var titleFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 35 : 20;
                var yFont =  $(document).width() >=1980 &&  $(document).height() >=1080 ? 20 : 10;
                var xFont =  $(document).width() >=1980 &&  $(document).height() >=1080 ? 35 : 20;
                var legendFont =  $(document).width() >=1980 &&  $(document).height() >=1080 ? 35 : 15;
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        reponsive: true,
                        maintainAspectRatio: false,
                        title:{
                          display: true,
                          text: "Salary Trends, 2011-2015 ($ per year):",
                          fontSize: titleFont,
                          fontColor: "#FFFFFF"
                        },
                        scales:{
                          yAxes:[{
                            gridLines:{
                              lineWidth: 0.5,
                              color: "#FFFFFF"
                            },
                            ticks:{
                              fontSize: yFont,
                              fontColor: "#FFFFFF"
                            }
                          }],
                          xAxes:[{
                            gridLines:{
                              lineWidth: 0.5,
                              color: "#FFFFFF"
                            },
                            ticks:{
                              fontSize: xFont, 
                              fontColor: "#FFFFFF"
                            }
                          }]
                        },
                        legend:{
                            fullWidth:true,
                            position:"bottom",
                            labels:{
                                fontSize:legendFont,
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