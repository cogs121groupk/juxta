$(document).ready(function(){
    console.log("dsada");
    var ctx = document.getElementById("SFhousing");
    
    //1. have array
    var housingData = [
        {
            label: "downtown SF",
            price: 3500,
            type: "housing"
        },
        {
            label: "Palo Alto",
            price: 2500,
            type: "housing"
        },
        {
            label: "San Jose",
            price: 2362,
            type: "housing"
        },
        {
            label: "Union City",
            price: 2200,
            type: "housing"
        }
    ]
    var salaryData = 
    {
        label: "architect CS",
        price: 3500,
        type: "job"
    }
    
    housingData.push(salaryData);
    // 2. sort array
    var data = housingData;
    function compare(a,b) {
      if (Number(a.price) < Number(b.price))
        return 1;
      else if (Number(a.price) > Number(b.price))
        return -1;
      else 
        return 0;
    }
    data.sort(compare);

    console.log(data);

    // 3. make separate data for each
    dataLabel = []
    dataSalary = []
    // if type == housing
    //     backgroundColor:[
    //         'rgb(255, 99, 132, 0.2)'
    //     ]
    // if type == salary
    //     backgroundColor:[
    //         'rgba(54, 162, 235, 0.2)',
    //     ]


    //determine if type == houseing -> use this color else use other color
    backgroundColor = [] 
    //determine if type == houseing -> use this color else use other color
    borderColor = []

    data.forEach(function(row){
        dataLabel.push(row.label);
        dataSalary.push(row.price);

        if (row.type == "housing"){
            backgroundColor.push('rgb(255, 99, 132)');
            borderColor.push('rgba(255,99,132,1)');
        }
        else {
            backgroundColor.push('rgb(54, 162, 235)');
            borderColor.push('rgba(54, 162, 235, 1)');
        }
    });
    
console.log(dataLabel)
    
    var SFData = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataLabel,
            datasets: [{
                label: '$$$',
                data: dataSalary,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 0.3
            }]
        },
        options: {
            title:{
                display: true,
                position: "bottom",
                text: "housing",
                fontSize: 30,
                fontColor: 'rgba(255,255,255,1)',
            },
            legend:{
                labels: {
                    fontSize: 30,
                    fontColor: 'rgba(255,255,255,1)',
                }
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: "per month",
                    fontColor: 'rgba(255,255,255,1)',
                    fontSize: 20,
                },
                yAxes: [{
                    ticks: {
                        fontColor: 'rgba(255,255,255,1)',
                        fontSize: 10,
                        beginAtZero:true, 
                        max:4000
                    }
                }],
                xAxes:[{
                    ticks:{
                        fontColor: 'rgba(255,255,255,1)',
                    }
                }]

            }
        }
    });



    // var ctx = document.getElementById("SDhousing");
    // var SDhousingData = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ["Downtown SD", "chula vista", "el capon", "Kearney Mesa"],
    //         datasets: [{
    //             label: 'San Diego Housing Price',
    //             data: [2000, 1300, 1450, 1800],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero:true,
    //                     max:4000
    //                 }
    //             }]
    //         }
    //     }
    // });
});




