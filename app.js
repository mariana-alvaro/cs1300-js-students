var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=OwJvyDhf5jRKA80LxcYcyvgxgTDgtkbBuKBqbbMLC5E";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      handleResponse(request.response);
      })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

const handleResponse = (response) => {
  const parsed_json = JSON.parse(response);
  const plants = parsed_json.data;
  console.log(plants);

  for (const plant of plants) {
    makeHTML(plant);
  }
}

const makeHTML = (plant) => {

  const plantDiv = document.createElement("div"); 
  plantDiv.innerText = plant.common_name;
  const commonNameDiv = document.getElementById("common-name");
  commonNameDiv.appendChild(plantDiv);

  const plantDiv2 = document.createElement("div"); 
  plantDiv2.innerText = plant.scientific_name;
  const sciNameDiv = document.getElementById("sci-name");
  sciNameDiv.appendChild(plantDiv2);
}

