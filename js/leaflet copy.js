var map = L.map("map", {
  center: [-7.7147, 113.215],
  zoom: 12
});

// Add fullscreen button to the map
L.control.fullscreen({
}).addTo(map);

// Add the imagery layer
var imageryLayer = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18
}).addTo(map);

// Add the reference layer with labels
var referenceLayer = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  subdomains: ['server', 'services'],
  attribution: 'Sources: Esri'
}).addTo(map);

// Add the polygon layer
var polygon = L.polygon(
  [
    [-7.737573, 113.209959],
    [-7.743834, 113.224055],
    [-7.664195, 113.284977],
    [-7.66837, 113.221787],
  ],
  {
    color: "#fff",
    weight: 2,
    fillOpacity: 0.2,
  }
).addTo(map);

// Create the label icon
var labelIcon = L.divIcon({
  className: "drone-label",
  html: "LABEL TEXT HERE",
});

// Create the drone icon
var myIcon1 = L.icon({
  iconUrl: "../images/danger-drone.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Create the drone icon for the second marker
var myIcon2 = L.icon({
  iconUrl: "../images/danger-drone.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

var marker1 = L.marker([-7.7549, 113.215], {
  icon: myIcon1,
  "data-drone-id": "123",
  noHide: true,
}).addTo(map);

var marker2 = L.marker([-7.676858, 113.25517], {
  icon: myIcon2,
  "data-drone-id": "456",
  noHide: true,
}).addTo(map);


// Get the popup elements
const popup = document.getElementById("popupDrone");
const droneIdElement = document.getElementById("droneId");
const closePopupBtn = document.getElementById("closePopupBtn");

// Add event listener to the second drone marker
marker2.addEventListener("click", () => {
  // Show the popup
  popup.style.display = "block";

  // Set the popup content based on the clicked marker
  const droneId = marker2.getAttribute("data-drone-id");
  droneIdElement.textContent = droneId;

  // Position the label element next to the marker
  const markerPos = marker2.getLatLng();
  labelIcon.setLatLng(markerPos);
  labelIcon.addTo(map);
});

// Add event listeners to the drone markers
const markers = document.querySelectorAll(".leaflet-marker-icon");
markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    // Show the popup
    popup.style.display = "block";

    // Set the popup content based on the clicked marker
    const droneId = marker.getAttribute("data-drone-id");
    droneIdElement.textContent = droneId;

    // Position the label element next to the marker
    const markerPos = marker.getLatLng();
    labelIcon.setLatLng(markerPos);
    labelIcon.addTo(map);
  });
});

// Add a click event listener to the SVG element
closePopupBtn.addEventListener("click", () => {
  closePopup();
});

function closePopup() {
  popup.style.display = "none";
  // Remove the label icon from the map when the popup is closed
  map.removeLayer(labelIcon);
}
