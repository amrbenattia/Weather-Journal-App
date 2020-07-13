/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

const apiKey = '&units=metric&appid=.................';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1+ '.'+ d.getDate()+'.'+ d.getFullYear();

// addEventListener to GET weather data when click on generate button
document.getElementById('generate').addEventListener('click', performAction);

// callback function for click event
function performAction(e){
    const zipCode =  document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    // Call the GET request to get weather data
    getWeatherData(baseURL, zipCode, apiKey)

    //chain promise to POST the API data and user data to this app
    .then(function(data) {
      postData('/weather', {date: newDate, cityName: data.name, temp: data.main.temp , feel: feeling})
    })

    //chain promise to upadate UI 
    .then(function(data){
      updateUI()
    }
    )
}

// GET request to the OpenWeatherMap API
const getWeatherData = async (baseURL, zip, key)=>{

  const response = await fetch(baseURL+zip+key)    
  try {
    const data = await response.json();
    // return data;
    
    if (Object.keys(data).length==2) {
      console.log(alert('enter a correct zip code'))
    } else {
      console.log('Data is successfully returned from the external API.')
      return data;
      }

  }catch(error) {
    console.log('error', error);
  }
}

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

// Async GET / UPDATE UI
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log('GET data from endpoint to updateUI' , allData)
      document.getElementById('date').innerHTML = `Today date is: ${allData.date}`;
      document.getElementById('temp').innerHTML = `The temperature in ${allData.cityName} city is: ${allData.temperature} &#8451`;
      document.getElementById('content').innerHTML = `Your feelings are: ${allData.feeling}`;
  
    }catch(error){
      console.log("error", error);
    }
  }
