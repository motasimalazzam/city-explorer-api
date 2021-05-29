const axios = require('axios');
module.exports=movieHandler;

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