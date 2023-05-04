var map = L.map("map", {
  center: [-7.7147, 113.215],
  zoom: 12,
  zoomControl: false // Remove this option
});

// Add zoom control with position option
L.control.zoom({ position: 'topright' }).addTo(map);

// Add fullscreen control with position option
L.control.fullscreen({
  position: 'topright'
}).addTo(map);

var imageryLayer = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18
}).addTo(map);

var referenceLayer = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  subdomains: ['server', 'services'],
  attribution: 'Sources: Esri'
}).addTo(map);

const polygons = [  L.polygon([    [-7.737573, 113.209959],
  [-7.743834, 113.224055],
  [-7.664195, 113.284977],
  [-7.66837, 113.221787],
], {
  color: "#fff",
  weight: 2,
  fillOpacity: 0.2,
}),

L.polygon([    [-7.716519, 113.144826],
  [-7.729276, 113.182592],
  [-7.797783, 113.176411],
  [-7.786767, 113.151526],
], {
  color: "#fff",
  weight: 2,
  fillOpacity: 0.2,
}),

L.polygon([    [-7.739757, 113.249791],
  [-7.77633, 113.293424],
  [-7.789533, 113.269485],
  [-7.78521, 113.237998],
], {
  color: "#fff",
  weight: 2,
  fillOpacity: 0.2,
}),
];

var myIcon = L.icon({
  iconUrl: "../images/danger-drone.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

var myIcon2 = L.icon({
  iconUrl: "../images/departure-drone.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

var myIcon3 = L.icon({
  iconUrl: "../images/arrival-drone.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

var allMarkers = [];

var marker1 = L.marker([-7.728188, 113.297433], {
  icon: myIcon,
  title: "Marker 1",
  alt: "Marker 1",
  droneId: "123",
}).addTo(map);
allMarkers.push(marker1);

var marker2 = L.marker([-7.720771, 113.224477], {
  icon: myIcon2,
  title: "Marker 2",
  alt: "Marker 2",
  droneId: "456",
}).addTo(map);
allMarkers.push(marker2);

var marker3 = L.marker([-7.789078, 113.170676], {
  icon: myIcon3,
  title: "Marker 2",
  alt: "Marker 2",
  droneId: "789",
}).addTo(map);
allMarkers.push(marker3);

marker1.bindTooltip("Drone ID: 123", { direction: "top", offset: [0, -30], permanent: true});
marker2.bindTooltip("Drone ID: 456", { direction: "top", offset: [0, -30], permanent: true});
marker3.bindTooltip("Drone ID: 789", { direction: "top", offset: [0, -30], permanent: true});

//filter
function filterMarkers() {
  // Get the range of values from the input fields
  var latitudeRange1 = parseFloat(document.getElementsByName("latitude-range1")[0].value);
  var latitudeRange2 = parseFloat(document.getElementsByName("latitude-range2")[0].value);
  var longitudeRange1 = parseFloat(document.getElementsByName("longitude-range1")[0].value);
  var longitudeRange2 = parseFloat(document.getElementsByName("longitude-range2")[0].value);
  var altitudeRange1 = parseFloat(document.getElementsByName("altitude-range1")[0].value);
  var altitudeRange2 = parseFloat(document.getElementsByName("altitude-range2")[0].value);

  // Loop through all markers and set the visibility based on the filter ranges
  for (var i = 0; i < allMarkers.length; i++) {
    var marker = allMarkers[i];
    var position = marker.getLatLng();
    var latitude = position.lat;
    var longitude = position.lng;
    var altitude = marker.options.altitude;

    var isVisible =
      (isNaN(latitudeRange1) || isNaN(latitudeRange2) || (latitude >= latitudeRange1 && latitude <= latitudeRange2)) &&
      (isNaN(longitudeRange1) || isNaN(longitudeRange2) || (longitude >= longitudeRange1 && longitude <= longitudeRange2)) &&
      (isNaN(altitudeRange1) || isNaN(altitudeRange2) || (altitude >= altitudeRange1 && altitude <= altitudeRange2));

    marker.setOpacity(isVisible ? 1 : 0);

    if (!isVisible) {
      // Remove tooltip if the marker is not visible
      marker.unbindTooltip();
    }
    else if (!marker.getTooltip()) {
      // Add tooltip if the marker is visible and doesn't have a tooltip
      var droneId = marker.options.droneId;
      var tooltip = L.tooltip({
        direction: 'top',
        offset: [0, -30]
      }).setContent('Drone ID: ' + droneId);
      marker.bindTooltip(tooltip);
    }
  }
}


const popupDrone = document.getElementById("popupDrone");
const droneIdElement = document.getElementById("droneId");
const closePopupBtn = document.getElementById("closePopupBtn");
const popupAlert = document.getElementById("popupAlert");

const markers = document.querySelectorAll(".leaflet-marker-icon");
let tooltipOpen = true;
const startCoords = [-7.727769, 113.214295];
let polyline;

function drawPolyline(startCoords, endCoords) {
  const polylineCoords = [startCoords, endCoords];
  polyline = L.polyline(polylineCoords, {
    color: '#fff',
    weight: 3,
    zIndexOffset: 1000
  }).addTo(map);
}

markers.forEach((marker) => {
  marker.addEventListener('click', () => {
    popupDrone.style.display = "block";
    const droneId = marker.getAttribute("droneId");
    droneIdElement.textContent = droneId;

    const tooltip = marker.getTooltip();
    if (tooltip && !tooltip.isOpen()) {
      marker.openTooltip();
    }
  });
});

let currentMarkerId = null;
let currentPolygonLayer = null;

marker1.on('click', (e) => {
  const clickedMarkerId = e.target._leaflet_id;
  if (clickedMarkerId === currentMarkerId) {
    return;
  }
  if (currentMarkerId !== null) {
    map.removeLayer(polyline);
    map.removeLayer(currentPolygonLayer);
  }
  drawPolyline([-7.743964, 113.252031], [-7.728188, 113.297433]);
  polygons[2].addTo(map);
  popupAlert.style.display = "block";
  currentMarkerId = clickedMarkerId;
  currentPolygonLayer = polygons[2];

  // set longitude and latitude
  document.getElementById('longitude').textContent = '113.297433';
  document.getElementById('latitude').textContent = '-7.728188';
});

marker2.on('click', (e) => {
  const clickedMarkerId = e.target._leaflet_id;
  if (clickedMarkerId === currentMarkerId) {
    return;
  }
  if (currentMarkerId !== null) {
    map.removeLayer(polyline);
    map.removeLayer(currentPolygonLayer);
  }
  drawPolyline([-7.728663, 113.214118], [-7.720771, 113.224477]);
  polygons[0].addTo(map);
  popupAlert.style.display = "none";
  currentMarkerId = clickedMarkerId;
  currentPolygonLayer = polygons[0];

  // set longitude and latitude
  document.getElementById('longitude').textContent = '113.224477';
  document.getElementById('latitude').textContent = '-7.720771';
});

marker3.on('click', (e) => {
  const clickedMarkerId = e.target._leaflet_id;
  if (clickedMarkerId === currentMarkerId) {
    return;
  }
  if (currentMarkerId !== null) {
    map.removeLayer(polyline);
    map.removeLayer(currentPolygonLayer);
  }
  drawPolyline([-7.732519, 113.174683], [-7.786078, 113.170676]);
  polygons[1].addTo(map);
  popupAlert.style.display = "none";
  currentMarkerId = clickedMarkerId;
  currentPolygonLayer = polygons[1];

  // set longitude and latitude
  document.getElementById('longitude').textContent = '113.170676';
  document.getElementById('latitude').textContent = '-7.786078';
});


const closeAlertBtn = document.getElementById("closeAlertBtn");

closeAlertBtn.addEventListener("click", () => {
  closeAlert();
});

function closeAlert() {
  popupAlert.style.display = "none";
}

closePopupBtn.addEventListener("click", () => {
  closePopup();
});

function closePopup() {
  popupDrone.style.display = "none";
  popupAlert.style.display = "none";
  tooltipOpen = false;
}

//graph
const chartCanvas = document.getElementById('myChart');
const chartHeight = chartCanvas.clientHeight;

const frameGraph = document.querySelector('.frame-graph');
frameGraph.style.height = `${chartHeight + 170}px`;

const frameGraph2 = document.querySelector('.frame-graph2');
frameGraph2.style.height = `${chartHeight + 55}px`;


const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Flights',
      data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 30, 35],
      backgroundColor: 'rgba(82, 205, 255, 1)',
      borderWidth: 0
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

const myChart = new Chart(chartCanvas, config);




