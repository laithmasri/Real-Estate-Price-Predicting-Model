function pageLoad() {
  console.log("Loading Document...");
  let url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function (data, status) {
    console.log("Got response for get_location_names request...");
    if (data) {
      let locations = data.locations;
      let uiLocations = document.getElementById("uiLocations");
      $("#uiLocations").empty();
      for (let x in locations) {
        $("#uiLocations").append(new Option(locations[x]));
      }
    }
  });
}

function getBHKChoices() {
  let choices = document.getElementsByName("bhkchoice");
  for (let choice in choices) {
    if (choices[choice].checked) {
      return parseInt(choice) + 1;
    }
  }
  return -1;
}

function getBathChoices() {
  let choices = document.getElementsByName("bathchoice");
  for (let choice in choices) {
    if (choices[choice].checked) {
      return parseInt(choice) + 1;
    }
  }
  return -1;
}

function predictPrice() {
  console.log("Estimate Price clicked");
  let sqft = document.getElementById("sqft-input");
  let bhkChoice = getBHKChoices();
  let bathChoice = getBathChoices();
  let location = document.getElementById("uiLocations");
  let price = document.getElementById("estimatedPrice");
  let url = "http://127.0.0.1:5000/predict_home_price";

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhkChoice,
      bath: bathChoice,
      location: location.value,
    },
    function (data, status) {
      console.log(data.estimated_price);
      document.getElementById("estimatedPrice").innerHTML =
        data.estimated_price.toString();
      console.log(status);
    }
  );
}
window.onload = pageLoad;
