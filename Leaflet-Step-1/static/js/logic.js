// Create a map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer
  var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  });
  
  darkMap.addTo(myMap);
  
  // Declare data variable
  var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

  // Loop through the features array and create one circle for each location

  d3.json(link, function(data) {
      console.log(data);

      data.forEach(function(feature){
               
        var depth = feature.geometry.coordinates[2];
        var mag = feature.properties.mag
        console.log(depth)
         
        L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]],{
            fillOpacity: 0.75,
            color: color,
            fillColor: color,
            
    // Adjust radius
         radius: mag * 2000
        }).bindPopup("Location: " + feature.properties.place + "<hr>Magnitude: " + feature.properties.mag + "<br>Location: " + "<br> Depth: "+ feature.geometry.coordinates[2])
            .addTo(myMap);   
        
        
        var color = "";
        switch (color) {
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
        }})


        
        
        


        
        // add circles to map
        

})

//     function Color(depth) {
//         switch (true) {
//           case depth <=50:
//             return "#bcd9ea";
//           case depth <=100:
//             return "#5ba4cf";
//           case depth <=200:
//             return "#298fca";
//           case depth <=300:
//             return "#0079bf";
//           case depth <=400:
//             return "#055a8c";
//           case depth <=500:
//               return "#094c72";
//           case depth >500:
//               return "#0c3953";
//           default:
//             return "#e4f0f6";
//         }
//     }

//     function Radius(mag) {
//         if (mag === 0) {
//           return 1;
//         }
//           return mag * 3;
//     }
    
//     function Style(feature) {
//         return {
//           opacity: 1,
//           fillOpacity: 1,
//           fillColor: Color(feature.geometry.coordinates[2]),
//           color: "#000000",
//           radius: Radius(feature.properties.mag),
//           stroke: true,
//           weight: 0.5
//         }
//     }
    

//     L.geoJson(data, {
//         pointToLayer: function(feature, latlng) {
//           return L.circleMarker(latlng);
//         },
//         style: Style,
//         onEachFeature: function(feature, layer) {
//           layer.bindPopup("Location: " + feature.properties.place + "<hr>Magnitude: " + feature.properties.mag + "<br>Location: " + "<br> Depth: "+ feature.geometry.coordinates[2]);
//         }
    
//       }).addTo(myMap);
//   })