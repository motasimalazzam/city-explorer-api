'use strict';

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT=process.env.PORT;

class Forecast {
    constructor(date,discription){
        this.date=date;
        this.discription=discription;
    }
}


let forecastArr=[];
let date;
let description;
let forecast;

// http://localhost:3001/getWeather?city=amman&lat=31.95&lon=35.91

server.get('/getWeather',(req,res) =>{
    
    console.log(req.query);
    
    let cityName=req.query.city
    // let latData= req.query.lat
    // let lonData= req.query.lon
    
    let weatherItem = weatherData.find(item =>{
        if( cityName.toLowerCase() == item.city_name.toLowerCase()  )
        return item
    })

    // console.log(weatherItem);

    try {
       
       for(let i=0; i<weatherItem.data.length; i++){
           
           date = weatherItem.data[i].datetime;
           description=`Low of ${weatherItem.data[i].min_temp}, high of ${weatherItem.data[i].temp} with ${weatherItem.data[i].weather.description}`
           forecast = new Forecast(date,description);
           forecastArr.push(forecast);
       }
       
       res.send(forecastArr);
       
   } catch{
    res.send('data not found FROM BACK');

   }
})


server.get('*', (req, res) => {
    res.status(404).send;
})



server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})