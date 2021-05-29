'use strict';

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT=process.env.PORT;

// IMPORT FUNCTIONS   
const movieHandler=require('./modules/movies.js');
const weatherHandler=require('./modules/weather.js');


// GENERATE  A ROUTES 

    // WEATHER ROUTE   
server.get('/getWeather',weatherHandler);

    // MOVIE ROUTE
server.get('/getMovie',movieHandler);
 


server.get('*', (req, res) => {
    res.send('Not Found');
})



server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})
