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
  console.log(this.destinations);
  console.log(id);
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




//ui logic
const myPassport = new Passport();



$(document).ready(function () {
  //selectors
  const form = $("form");
  const display = $("#display-text");
  const displayDiv = $("#display");

  attachDestinationListeners();
  //ui functions

  function renderPassport(passport) {
    const passportKeys = Object.keys(passport.destinations);

    let allCardsHtml = "";

    passportKeys.forEach((key) => {
      const dest = passport.destinations[key];
      let destCardHtml =
        "<div class='card mb-3'>" +
        "<div class='card-header'><h2>" +
        dest.location +
        "</h2> <button id =" +
        key +
        " class='btn btn-primary show-button'>More</button></div>" +
        "</div>";

      allCardsHtml += destCardHtml;
    });
    displayDiv.empty();
    displayDiv.append(allCardsHtml);
  }

  function attachDestinationListeners() {
    $("#display").on("click", ".show-button", function () {
      showDestination(this.id);
    });
    $("#display").on("click", ".delete-button", function () {
      myPassport.deleteDestination(this.id);
      console.log(myPassport);
      renderPassport(myPassport);
    });
  }
  
  function showDestination(id) {
    const destination = myPassport.findDestination(id);
  
    let landmarksHtml = "";
  
    destination.landmarks.forEach((landmark) => {
      landmarksHtml += "<li>" + landmark + "</li>";
    });
  
    const detailsHtml = "<div class='card-body'>" +
          "<h5 class='card-title'>A " +
          destination.season +
          " adventure</h5>" +
          "<ul>" +
          landmarksHtml +
          "</ul>" +
          "<p>It was " + destination.note +
          "<button id=" + id + " class='btn btn-danger delete-button'>Delete</button> "
          "</div>"
  
    $("#" + id).parent().after(detailsHtml);
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
    renderPassport(myPassport);
  };

  //actions
  form.submit(submitDestination);
});
