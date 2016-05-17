L.mapbox.accessToken = 'pk.eyJ1IjoiYmVlcnllMjgiLCJhIjoiY2lob2owdHFuMHVlcXRjbHppYjk3bnVtMyJ9.c9O7alSJC22CPlwNuiWOOw';


var southWest = L.latLng(32.476625, -117.700736),
    northEast = L.latLng(33.840018, -116.169991),
    bounds = L.latLngBounds(southWest, northEast);

var marker;


var map = L.mapbox.map('map', 'mapbox.streets', {

   maxBounds: bounds,
   maxZoom: 20,
   minZoom: 9
});

//ajax call for business data
$.get("/getBusinessLocationData", function(response){

  for(var i = 0; i < response.length; i++){


    if(isNaN(parseFloat(response[i].LATITUDE)) || isNaN(parseFloat(response[i].LONGITUDE))){ console.log(response[i]);}

    else{

      if(i%10 == 0){

        marker = L.marker(new L.LatLng(parseFloat(response[i].LATITUDE), parseFloat(response[i].LONGITUDE)), {

          title: response[i].NAME

        });

        marker.bindPopup(response[i].NAME);

        marker.addTo(map);
      }
    }
  }
});


