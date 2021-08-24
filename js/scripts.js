//business logic

//add a destination to our list of places
// places:

function Passport() {
  this.destinations = {};
  this.currentId = 0;
}

Passport.prototype.assignId = function () {
  this.currentId++;
  return this.currentId;
};

Passport.prototype.addDestination = function (destination) {
  destination.id = this.assignId();
  this.destinations[destination.id] = destination;
};

Passport.prototype.findDestination = function (id) {
  if (this.destinations[id] != undefined) {
    return this.destinations[id];
  }
  return false;
};

Passport.prototype.deleteDestination = function (id) {
  if (!this.destinations[id]) {
    return false;
  }
  delete this.destinations[id];
  return true;
};

function Destination(location, season, note, landmarks) {
  this.location = location;
  this.season = season;
  this.note = note;
  this.landmarks = landmarks;
}

Destination.prototype.tripSummary = function () {
  let landmarkString = "";

  this.landmarks.forEach((landmark, i) => {
    if (i === 0) {
      landmarkString += " the " + landmark;
    } else if (i != this.landmarks.length - 1) {
      landmarkString += ", the " + landmark;
    } else if (this.landmarks.length === 2) {
      landmarkString += " and the " + landmark;
    } else {
      landmarkString += ", and the " + landmark;
    }
  });

  return (
    "I visited " +
    this.location +
    " in " +
    this.season +
    " and saw" +
    landmarkString +
    ". It was " +
    this.note +
    "!"
  );
};
function attachDestinationListeners(dest) {
  $("#display").on("click", "button", function(e) {
    e.preventDefault();
    // console.log ("The id of this <div> is " + this.id + ".");
    // const displayText = dest[this.id].tripSummary();
    const displayText = dest[this.id].note;
    console.log("target: " + this.target);
    console.log(dest[this.id]);
    this.after($("<p>").text(displayText));
  });
}


//ui logic
$(document).ready(function () {
  const myPassport = new Passport();

  //selectors
  const form = $("form");
  const display = $("#display-text");
  const displayDiv = $("#display");
  
  attachDestinationListeners(myPassport.destinations);
  //ui functions

  function renderPassport() {
    const passportKeys = Object.keys(myPassport.destinations);
  
    let destCardHtml = "";
  
    passportKeys.forEach((key) => {
      const dest = myPassport.destinations[key];
  
      let landmarksHtml = "";
  
      dest.landmarks.forEach(landmark => {
        landmarksHtml += "<li>" + landmark + "</li>"; 
      });
  
      destCardHtml += "<div class='card mb-3'>" +
        "<div class='card-header'>" + dest.location + "</div>" +
        "<div class='card-body'>" +
          "<h5 class='card-title'>A " + dest.season + " adventure</h5>" +
          "<ul>" + landmarksHtml + "</ul>" +
          "<button id =" + key + " class='btn btn-primary'>More</button>" +
        "</div>" +
      "</div>";
    });
    // displayDiv.empty();
    displayDiv.append(destCardHtml);
  }

  //handler callbacks
  const submitDestination = function (event) {
    event.preventDefault();
    const locationInput = $("#location-input").val();
    const seasonInput = $("#season-input").val();
    const noteInput = $("#note-input").val();
    const landmarksInput = $("#landmarks-input").val().split(", ");

    const newDestination = new Destination(
      locationInput,
      seasonInput,
      noteInput,
      landmarksInput
    );

    display.text(newDestination.tripSummary());

    myPassport.addDestination(newDestination);
    console.dir(myPassport);
    renderPassport();
  };

  //actions
  form.submit(submitDestination);
});
