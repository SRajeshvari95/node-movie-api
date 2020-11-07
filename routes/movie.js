var express = require('express');
var router = express.Router();
var imdb = require('imdb-api');

//Models
const Movie = require('../models/Movie');

//get all movies
router.get('/',(req,res)=>{
  const promise = Movie.find({ }).sort({imdb_score: 1}); 
  promise.then((data)=> {
    res.json(data);
//    res.send({status:'sucess',data:data});

  }).catch((err)=> {
    res.json(err);
  })
});

// top 10
router.get('/top10',(req,res)=>{
  const promise = Movie.find({ }).limit(10).sort({imdb_score: 1}); // bütün filmlerin listelenmesi
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  })
});

// find by Id
router.get('/:movie_id',(req,res,next)=>{
   const promise = Movie.findById(req.params.movie_id);
   promise.then((movie)=>{
     if(!movie)
     next({message: 'The movie was not found'});
     res.json(movie);
   }).catch((err)=> {
     res.json(err);
   });
});

//Update movie genre,rating
router.put('/:movie_id',(req,res,next)=>{
   const promise = Movie.findByIdAndUpdate(
     req.params.movie_id,
     req.body,
     {new: true} 
   );
   promise.then((movie)=>{
     if(!movie)
     next({message: 'The movie was not found'});
     res.json(movie);
   }).catch((err)=> {
     res.json(err);
   });
});


//between dates

router.get('/between/:start_year/:end_year',(req,res)=>{
  const {start_year,end_year} = req.params;
  const promise = Movie.find(
    {
       year: { "$gte" :parseInt(start_year), "$lte": parseInt(end_year)}
    }
  );
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  })
});

//rating between

router.get('/ratingbetween/:start_rating/:end_rating',(req,res)=>{
  const {start_rating,end_rating} = req.params;
  const promise = Movie.find(
    {
       imdb_score: { "$gte" :parseInt(start_rating), "$lte": parseInt(end_rating)}
    }
  );
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  })
});

//genres

router.get('/genres/:genre',(req,res)=>{
  const {genre} = req.params;
  const promise = Movie.find(
    {
      genres: { "$regex" : genre }
    }
  );
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  })
});

// Search movie and Insert
router.get('/search/:name',(req,res)=>{
  const {name} = req.params;
  const promise = Movie.find(
    {
      title: { "$in" : [name] }
    }
  );
  promise.then((data)=> {

    if(data.length==0){
      imdb.get({
        name: name
      }, {
        apiKey: '6aa698b7'
      }).then((response) => {
        
        const movie = new Movie({
          title: response.title, 
          imdb_score: response.rating,
          year: response.year,
          genres:response.genres
        });

        const promise = movie.save();
        promise.then((data)=>{
            res.json(data);
        }).catch((err)=>{
          res.json(err);
        });

      }).catch(console.log);
    }
    else{
      res.json(data);
    }
    //res.json(data);
    
  }).catch((err)=> {
    res.json(err);
  })
});

module.exports = router;
