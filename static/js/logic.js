
// Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform a GET request to the query URL/
d3.json(url).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createMaps(data.features);

});

function markerSize(magnitude) {
  return magnitude * 10000;
}

function chooseColor(depth) {
  if (depth < 10) return "chartreuse";
  else if (depth < 30) return "greenyellow";
  else if (depth < 50) return "yellow";
  else if (depth < 70) return "orange";
  else if (depth < 90) return "lightsalmon";
  else return "red";
}
function createMaps(earthquake) {
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var myMap = L.map("earthquake1", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: street
  });

  console.log("E:", earthquake[0]);
  console.log(earthquake[0].geometry.coordinates[1], earthquake[0].geometry.coordinates[0])

  // Loop through the cities array, and create one marker for each city object.
  for (var i = 0; i < earthquake.length; i++) {
    L.circle([earthquake[i].geometry.coordinates[1], earthquake[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "black",
      weight: .5,
      fillColor: chooseColor(earthquake[i].geometry.coordinates[2]),
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to earthquake magnitude
      radius: markerSize(earthquake[i].properties.mag)
    }).bindPopup(`<h1>${earthquake[i].properties.place}</h1> <hr> <h3>Magnitude: ${earthquake[i].properties.mag}</h3>`).addTo(myMap);
  }
}

// function createFeatures(earthquakeData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakesArray = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // console.log("earthquakes:", earthquakesArray);
//   // Send our earthquakes layer to the createMap function/
//   createMap(earthquakesArray);
// }

// function createMap(earthquakes) {

//   // Create the base layers.
//   var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   })

//   var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   });

//   // Create a baseMaps object.
//   var baseMaps = {
//     "Street Map": street,
//     "Topographic Map": topo
//   };

//   // Create an overlay object to hold our overlay.
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   var myMap = L.map("earthquake1", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [street, earthquakes]
//   });

//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
//   // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

// }


// // Create a red circle over Dallas.
// L.circle([32.7767, -96.7979], {
//   color: "red",
//   fillColor: "red",
//   fillOpacity: 0.75,
//   radius: 10000
// }).addTo(myMap);

// // Loop through the cities array, and create one marker for each city object.
// for (var i = 0; i < cities.length; i++) {
//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius to equal the output of our markerSize() function:
//     // This will make our marker's size proportionate to its population.
//     radius: markerSize(cities[i].population)
//   }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
// }

// // The function that will determine the color of a neighborhood based on the borough that it belongs to
// function chooseColor(borough) {
//   if (borough == "Brooklyn") return "yellow";
//   else if (borough == "Bronx") return "red";
//   else if (borough == "Manhattan") return "orange";
//   else if (borough == "Queens") return "green";
//   else if (borough == "Staten Island") return "purple";
//   else return "black";
// }