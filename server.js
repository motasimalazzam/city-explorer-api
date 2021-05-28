'use strict';

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT=process.env.PORT;

// CLASS FOR WEATHER PROPERTIES
class Forecast {
    constructor(item){
        this.date=item.datetime;
        // `Low of ${item.min_temp}, high of ${item.temp} with ${item.weather.description}`
        this.discription=`Low of ${item.min_temp}, high of ${item.temp} with ${item.weather.description}`

    }
}

// CLASS FOR MOVIE PROPERTIES
class Movie{
    constructor(item){
        this.title=item.original_title;
        this.overview=item.overview;
        this.average_votes=item.vote_average;
        this.total_votes=item.vote_count;
        this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
    }
}

// GENERATE  A ROUTES 

    // WEATHER ROUTE   
server.get('/getWeather', weatherHandler);

    // MOVIE ROUTE
server.get('/getMovie',movieHandler);



// FUNCTIONS 

   // WEATHER FUNCTION   
// http://localhost:3001/getWeather?city=amman&lat=31.95&lon=35.91
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

   // MOVIE FUNCTION
// http://localhost:3001/getMovie?movie=seattle
 function movieHandler(req,res){

    let movieName=req.query.movie;
    let movieKey=process.env.MOVIE_KEY;
    let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieName}`;
    // let result;
    // result= axios.get(movieUrl).then(res.send(result));
    
    axios
     .get(movieUrl)
       .then(result=>{
           const movieArr=result.data.results.map(item=>{
               return new Movie(item);
           })
       if(movieArr==0){
        res.send(`No Movie for this City`);
       }else{res.send(movieArr);}
       })
    //    .catch(error=>{
    //     res.send(`No Movie for this City ${error}`);
    //    })
}



server.get('*', (req, res) => {
    res.send('Not Found');
})



server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})
// server.get('/getWeather',(req,res) =>{
    
//     console.log(req.query);
    
//     let cityName=req.query.city
//     // let latData= req.query.lat
//     // let lonData= req.query.lon
    
//     let weatherItem = weatherData.find(item =>{
//         if( cityName.toLowerCase() == item.city_name.toLowerCase()  )
//         return item
//     })

//     // console.log(weatherItem);

//     try {
       
//        for(let i=0; i<weatherItem.data.length; i++){
           
//            date = weatherItem.data[i].datetime;
//            description=`Low of ${weatherItem.data[i].min_temp}, high of ${weatherItem.data[i].temp} with ${weatherItem.data[i].weather.description}`
//            forecast = new Forecast(date,description);
//            forecastArr.push(forecast);
//        }
       
//        res.send(forecastArr);
       
//    } catch{
//     res.send('data not found FROM BACK');

//    }
// })