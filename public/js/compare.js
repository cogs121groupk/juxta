(function($){
	var data = dataRetreived[2015][industry];
	function compare(a,b) {
      if (Number(a.annual_mean) < Number(b.annual_mean))
        return -1;
      else if (Number(a.annual_mean) > Number(b.annual_mean))
        return 1;
      else 
        return 0;
    }
    data.sort(compare);
}

