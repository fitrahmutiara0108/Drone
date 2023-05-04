window.onclick = function(event) {
  // Toggle dropdown for "myDropdown"
  if (event.target.matches(".dropbtn")) {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
    
    // Close dropdown for "notifDropdown"
    var notifDropdown = document.getElementById("notifDropdown");
    if (notifDropdown.classList.contains("show")) {
      notifDropdown.classList.remove("show");
    }
  } else if (!event.target.matches(".dropdown-content")) {
    // Close dropdown for "myDropdown"
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
  
  // Toggle dropdown for "notifDropdown"
  if (event.target.matches(".notifbtn")) {
    var notifDropdown = document.getElementById("notifDropdown");
    notifDropdown.classList.toggle("show");
    
    // Close dropdown for "myDropdown"
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  } else if (!event.target.matches(".notif-content")) {
    // Close dropdown for "notifDropdown"
    var notifDropdowns = document.getElementsByClassName("notif-content");
    for (var j = 0; j < notifDropdowns.length; j++) {
      var openNotifDropdown = notifDropdowns[j];
      if (openNotifDropdown.classList.contains("show")) {
        openNotifDropdown.classList.remove("show");
      }
    }
  }
}