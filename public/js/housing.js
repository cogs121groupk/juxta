
var jobType = [];
var jobs;

$(document).ready(function(){
    
    function getPromise() {
        return new Promise(function(resolve, reject){
            $.get('/getIndustry', function(sessionData){
                $.get('/getSanData', function(data){
                    jobs = data[2015][sessionData.industry];;
                    for (var i = 0; i<jobs.length; i++){
                        jobType.push(jobs[i].title);
                    }
                    resolve();
                });
            });
        });
    }

    var promise = getPromise();
    promise.then(function(){
        for(var i=0; i<jobType.length; i++){ 
            const template = "<option value='"+jobType[i]+"'>"+jobType[i]+"</option>";
            $('#job-select').append(template);
        }
        $("#job-select").change(chooseJob);
        createGraph({}, true);
    });
    // test();

});

function chooseJob(e){
    var j = $(this).val();
    var data;
    for(var i=0; i<jobs.length; i++){
        if(jobs[i].title == j){
            data = jobs[i];
            break;
        }
    }
    var title = truncate(data.title, 15);
    var salaryData = 
    {
        label: title,
        price: data.annual_mean/48,
        type: "job"
    }

    createGraph(salaryData, false);
    
}

function createGraph(salary, initial){
    document.getElementById("graph").innerHTML = "<canvas id='housing' width='100' height='100'></canvas>";
    var ctx = document.getElementById("housing");
    
    //1. have array
    // var housingData = [
    //     {
    //         label: "downtown SF",
    //         price: 3500,
    //         type: "housing"
    //     },
    //     {
    //         label: "Palo Alto",
    //         price: 2500,
    //         type: "housing"
    //     },
    //     {
    //         label: "San Jose",
    //         price: 2362,
    //         type: "housing"
    //     },
    //     {
    //         label: "Union City",
    //         price: 2200,
    //         type: "housing"
    //     }
    // ]


    // var salaryData = 
    // {
    //     label: "architect CS",
    //     price: 3500,
    //     type: "job"
    // }

    if (initial){
        var title = truncate(jobs[0].title, 15);
        salary = 
        {
            label: title,
            price: jobs[0].annual_mean/48,
            type: "job"
        }
    }


    var housingData = [
        {
            label: "Chula Vista",
            price: 1300,
            type: "housing"
        },
        {
            label: "El Cajon",
            price: 1450,
            type: "housing"
        },
        {
            label: "Downtown",
            price: 2000,
            type: "housing"
        },
        {
            label: "Kearny Mesa",
            price: 1800,
            type: "housing"
        }
    ]

    housingData.push(salary);
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
            backgroundColor.push('rgba(255, 99, 132,0.7)');
            borderColor.push('rgba(255,99,132,1)');
        }
        else {
            backgroundColor.push('rgba(54, 162, 235, 0.7)');
            borderColor.push('rgba(54, 162, 235, 1)');
        }
    });
    
// console.log(dataLabel)
    var scaleFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 20 : 15;
    var xAxisFont = $(document).width() >=1980 &&  $(document).height() >=1080 ? 20 : 15;
    var yAxisFont =  $(document).width() >=1980 &&  $(document).height() >=1080 ? 15 : 10;
    console.log(scaleFont);
    var SFData = new Chart(ctx, {
        data: {
            labels: dataLabel,
            datasets: [{
                data: dataSalary,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 0.3
            }]
        },
        type: 'bar',
        options: {
            legend: {
                display: false
            },
            scales:{
                yAxes:[{
                    gridLines:{
                        color: "#FFFFFF"
                    },
                    ticks:{
                        beginAtZero: true,
                        fontSize: scaleFont,
                        fontColor: "#FFFFFF"
                    }
                }],
                xAxes:[{
                    gridLines:{
                        color: "#FFFFFF"
                    },
                    ticks:{
                        fontSize: xAxisFont,
                        fontColor: "#FFFFFF"
                    }
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        fontSize: yAxisFont,
                        fontColor: "#FFFFFF"
                    }
                }]
            }
        }
    });
}

function truncate( word, n ){
    if (word.length > n)
        word = word.substring(0,n)+"...";
    return word;
};


