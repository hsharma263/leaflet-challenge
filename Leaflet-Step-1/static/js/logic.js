var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";

d3.json(url).then(function(data){
    createFeatures(data.features);
    console.log(data.features)
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };


    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    createMap(earthquakes);
}

function createMap(earthquakes){
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var baseMaps = {
      "Street Map": street
  };

  var overlayMaps = {
      Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 2,
      layers: [street, earthquakes]
  });


};