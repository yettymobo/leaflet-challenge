// Create a map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

  // Add a marker to the map for each earthquake
  d3.json(link).then(function(response) {
    function Color(depth) {
        switch (true) {
          case depth <=50:
            return "#bcd9ea";
          case depth <=100:
            return "#5ba4cf";
          case depth <=200:
            return "#298fca";
          case depth <=300:
            return "#0079bf";
          case depth <=400:
            return "#055a8c";
          case depth <=500:
              return "#094c72";
          case depth >500:
              return "#0c3953";
          default:
            return "#e4f0f6";
        };
    function Style(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: Color(feature.geometry.coordinates[2]),
          color: "#000000",
          radius: mapRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
    }

    