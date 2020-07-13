// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 3000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

// POST '/weather' Route
app.post('/weather', addWeatherData);

//  GET '/all' Route
app.get('/all', sendData);


// callback function for POST route add incoming data to projectData endpoint
function addWeatherData (req,res){
  projectData.date = req.body.date;
  projectData.cityName = req.body.cityName;
  projectData.temperature = req.body.temp;
  projectData.feeling = req.body.feel;
  res.send(projectData)
  console.log(projectData)
}

// callback function of GET route returns projectData endpoint
function sendData (req, res) {
  res.send(projectData);
}