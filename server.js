'use strict';

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT=3002;


// http://localhost:3002//getWeather?weatherName=Amman
server.get('/getWeather',(req,res) =>{

    console.log(req.query);
    
    let weatherNameData=req.query.weatherName
    // let weatherLatData= req.query.weatherLat
    // let weatherLonData= req.query.weatherLon
    let weatherItem = weatherData.find(item =>{
        if(item.city_name == weatherNameData)
        return item
    })
    res.send(weatherItem)
})


server.get('*', (req, res) => {
    res.send('not found fu** world');
})



server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})