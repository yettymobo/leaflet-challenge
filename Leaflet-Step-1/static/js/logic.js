// Declare data variable
var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(queryURL, function(data) {
    console.log(data);
    
  createMap(data.features);

  });


function createMap(data) {
   
    // Create a map object
    var myMap = L.map("mapid", {
        center: [15.09, -40.71],
        zoom: 3
     });
  
    // Add a tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 10,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    }).addTo(myMap);


     // iterate through the data for each earthquake instance
     data.forEach(feature => {
    
        var depth = feature.geometry.coordinates[2];
        var mag = feature.properties.mag
        var long = feature.geometry.coordinates[0];
        var lat  = feature.geometry.coordinates[1];

        
        // switch statement for color
        var color = '';
         if (depth <=50){
            color = "#bcd9ea";
         }
         else if (depth <=100){
            color = "#5ba4cf";
         }
         else if (depth <=200){
            color = "#298fca";
         }
         else if (depth <=300){
            color = "#0079bf";
         }
         else if (depth <=400){
            color = "#055a8c";
         }
         else if (depth <=500){
            color = "#094c72";
         }
        else {
            color = '#0c3953'
        }

        // Create circle markers and add pop-up box
        L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.9,
            radius: mag*40000
        }).bindPopup(feature.properties.place + "<hr>Magnitude: " + feature.properties.mag + "<br>Location: " + "<br> Depth: "+ feature.geometry.coordinates[2])
        .addTo(myMap);



    })
        //
    var legend=L.control({
        position: 'bottomright'
        });
    
        legend.onAdd=function(){
            var div=L.DomUtil.create('div', 'legend');
    
            
            var colors = ['#bcd9ea', '#5ba4cf', '#298fca', '#0079bf', '#055a8c', '#094c72', '#0c3953'];
            var ranges = ['<50', '50-100', '100-200', '200-300', '300-400', '400-500', '500+']
            // forEach
            for (var i=0; i <colors.length; i++){
                div.innerHTML +=
                '<li style="background-color:'+ colors [i] + '">' + ranges[i] + '</li>'
    
            }
        
            return div;
        };
        legend.addTo(myMap)
    };