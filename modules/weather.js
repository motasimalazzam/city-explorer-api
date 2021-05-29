const axios = require('axios');
module.exports=weatherHandler;

// CLASS FOR WEATHER PROPERTIES
class Forecast {
    constructor(item){
        this.date=item.datetime;
        this.discription=`Low of ${item.min_temp}, high of ${item.temp} with ${item.weather.description}`

    }
}

   // WEATHER FUNCTION   
// http://localhost:3001/getWeather?city=amman
function weatherHandler (req,res) {

    let cityName=req.query.city;
    let weatherKey=process.env.WEATHER_KEY;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherKey}`;
    // let result= axios.get(weatherUrl)
    // res.send(result.data)
    
    axios
     .get(weatherUrl)
      .then(result =>{
          const weatherArr=result.data.data.map(item=>{
            //   console.log(result.data);
              return new Forecast(item);
          })
          res.send(weatherArr);
        })
        .catch(error=>{
         res.send(`No weather data for this City ${error}`);
        })
    }