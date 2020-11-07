# nodejs-movie
Node.JS Movie Api

# Movies

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/movies | `GET` | Empty | List all movies. |
| /api/movies/search/:name | `GET` |  Get a movie from imdb or local. | Create a new movie from imdb if not exist in local. |
| /api/movies/:movie_id | `GET` | Empty | Get a movie. |
| /api/movies/:movie_id | `PUT` | {'genre':'movie', 'imdb_score':'9.7'} | Update a movie with new info. |
| /api/movies/genres/:genre | `GET` | Empty | GET a movie. |
| /api/movies/top10 | `GET` | Empty | Get the top 10 movies. |
| /api/movies/between/:start_year/:end_year | `GET` | Empty | Movies between two dates. |
| /api/movies/ratingbetween/:start_rating/:end_rating | `GET` | Empty | Movies between two ratimg. |

