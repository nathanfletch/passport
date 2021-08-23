//business logic


//add a destination to our list of places
// places:

function Passport () {
  this.destinations = {};
}

Passport.prototype.addDestination = function(destination) {
  this.destinations[destination.location] = destination;
};


function Destination (location, season, note, landmarks) {
  this.location = location;
  this.season = season;
  this.note = note;
  this.landmarks = landmarks;
}

// Destination.prototype.country = function() {
//   return this
// }




//ui logic
$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    const text = $("#input1").val();
    $("#display-text").text(text);
  });
});