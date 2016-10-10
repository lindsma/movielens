//if enter is pressed, the specific movie is searched

$('#userInput').keypress(function(event) {
    var searchString = $('#userInput').val();
    if (event.which == 13) {
        movieSearch(searchString);
        return false;
    }
});

// search bar requests

function movieSearch(searchString) {
    var searchbar = $("#userInput").val("");
<<<<<<< HEAD
  //  var dataArray = [];
=======
>>>>>>> master
    $.ajax({
        "method": "GET",
<<<<<<< HEAD
        "url": "https://shielded-taiga-96422.herokuapp.com/api/get_movies/" + encodeURIComponent(searchString),
        "data": {},
        "datatype": "json",
        "success": function(data) {
          for (var index = 0; index < data.length; index++) {
<<<<<<< HEAD
            new MovieDetails(data.results[index]);
              //populateMovies(data[index]);
          }
      },
      "error": handleError
  });
}
=======
             return new MovieDetails(data.movie_data[index]);
           }
       },
       "error": handleError
   });
 }


<<<<<<< HEAD

// function movieSearch(searchString) {
//    var searchbar = $("#userInput").val("");
//  //  var dataArray = [];
//    $.ajax({
//        "method": "GET",
//        "url": "/api/get_movies/" + encodeURIComponent(searchString),
//        "data": {},
//        "datatype": "json",
//        "success": function(data) {
//          for (var index = 0; index < data.length; index++) {
//            return new MovieDetails(data.results[index]);
//              //populateMovies(data[index]);
//          }
//      },
//      "error": handleError
//  });
// }

// function MovieDetails(movieObject) {
//  console.log(movieObject);
//  this.info = {
//    movieId: movieObject.movie_info.id,
//    title: movieObject.movie_info.title,
//    overview: movieObject.movie_info.url,
//    release: movieObject.movie_info.release_date,
//    movieRating: movieObject.rating,
//    poster: getposter(this.title)
//  };
//  console.log(movieObject);
//    var source = $('#home-template').html();
//    var template = Handlebars.compile(source);
//    var context = {
//        rating: this.movieRating,
//         moviePoster: this.poster,
//        releaseDate: this.release,
//        movieTitle: this.title,
//        overview: this.overview,
//        movieId: this.movieId,
//    };
//    var html = template(context);
//    $(html).insertAfter("#search");
// }
>>>>>>> master


//NavBar genre requests

function movieQuery(response) {
    $.ajax({
        "method": "GET",
        "url": "../api/genre/" + response,
=======
=======
        // "url": "/api/get_movies/" + encodeURIComponent(searchString),
        "url": 'https://shielded-taiga-96422.herokuapp.com/api/get_movies/' + encodeURIComponent(searchString),
>>>>>>> master
        "data": {},
        "datatype": "json",
        "success": function(data) {
            for (var index = 0; index < 20; index++) {
                new MovieDetails(data.movie_data[index]);
            }
        },
        "error": handleError
    });
}
>>>>>>> ada625909fc44e236646ac2809d4d31a3e546acf

<<<<<<< HEAD
// function getRating(movieObject) {
//
//     var movieId = movieObject.id;
//
//     console.log(movieId);
//
//     $.get('../api/avg-rating?search=' + encodeURIComponent(movieId), function(response) {
//         var avgRating = response[0].average_rating;
//     });
//     console.log(avgRating);
//     populateMovies(movieObject, avgRating);
//
// }

// $.ajax({
//     "method": "GET",
//     "url": "../api/avg-rating?search=" + encodeURIComponent(movieId),
//     "data": {},
//     "datatype": "json",
//     "success": function(data) {
//         var avgRating = data[0].average_rating;
//         populateMovies(movieObject, avgRating);
//         console.log(avgRating);
//     },
//     "error": handleError
// });


<<<<<<< HEAD
function getPoster(title) {
    var apiKey = 'aecec41c5b24a3cdd29ce5c1491c5040';
    var titlePoster = title.substring(0, title.indexOf('('));
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(titlePoster) + "&api_key=" + apiKey,
        "method": "GET",
        "processData": false,
        "data": "{}"
    };
    $.ajax(settings).done(function(response) {
        return response.results[0].poster_path;
    });
}
=======
// function getPoster(title) {
//     var apiKey = 'aecec41c5b24a3cdd29ce5c1491c5040';
//     var titlePoster = title.substring(0, title.indexOf('('));
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(titlePoster) + "&api_key=" + apiKey,
//         "method": "GET",
//         "processData": false,
//         "data": "{}"
//     };
//     $.ajax(settings).done(function(response) {
//         return response.results[0].poster_path;
//     });
// }
>>>>>>> master
=======
//NavBar genre requests
>>>>>>> master

function movieQuery(response) {
  $.ajax({
    "method": "GET",
    "url": 'https://shielded-taiga-96422.herokuapp.com/api/genre/' + response,
    "data": {},
    "datatype": "json",
    "success": function(data) {
      for (var index = 0; index < 20; index++) {
        console.log(data[index]);
        new MovieDetails(data[index]);
      }
    },
    "error": handleError
  });
}

function MovieDetails(movieObject) {
    this.info = {
        movieId: movieObject.id,
        title: movieObject.title,
        overview: movieObject.url,
        release: movieObject.release_date
        //movieRating: movieObject.rating,
        //  poster: getposter(this.title, this)
    };
    this.MagicElements = function(movieObject) {
        var source = $('#home-template').html();
        var template = Handlebars.compile(source);
        var context = {
            //rating: this.info.movieRating,
            // moviePoster: this.info.poster,
            releaseDate: this.info.release,
            movieTitle: this.info.title,
            overview: this.info.overview,
            movieId: this.info.movieId,
        };
        var html = template(context);
        $(html).insertAfter("#search");
    };
    this.MagicElements(movieObject);
}




function getPoster(title) {
    var apiKey = 'aecec41c5b24a3cdd29ce5c1491c5040';
    var titlePoster = title.substring(0, title.indexOf('('));
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(titlePoster) + "&api_key=" + apiKey,
        "method": "GET",
        "processData": false,
        "data": "{}"
    };
    $.ajax(settings).done(function(response) {
        return response.results[0].poster_path;
    });
}

// rate movie

function rateMovie(movieId, movieRating) {
    if (movieRating === 'delete') {
        deleteRating(movieId);
    } else {
        $.ajax({
            "method": "POST",
            "url": "/genre/horror",
            "data": {},
            "datatype": "json",
            "success": function(data) {
                dataContainer = data;
            }
        });
    }
}

// delete movie

function deleteRating(movieId) {
    $.ajax({
        "method": "DELETE",
        "url": "/genre/horror",
        "data": {},
        "datatype": "json",
        "success": function(data) {
            dataContainer = data;
        }
    });
}

<<<<<<< HEAD
//If we're awesome, we'll get the movie title from fitch's database, then
//use it to search the movie database for a movie poster.

/**var apiKey =  'aecec41c5b24a3cdd29ce5c1491c5040';
var poster;
 var settings = {
   "async": true,
   "crossDomain": true,
   "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(searchString) + "&api_key=" + apiKey,
   "method": "GET",
   "processData": false,
   "data": "{}"
 };
 $.ajax(settings).done(function(response) {
    poster = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + response.results[0].poster_path;
 });
console.log(poster);
**/


=======
>>>>>>> ada625909fc44e236646ac2809d4d31a3e546acf
// toggle classes

// click on genre, populate with genre movies

$('.navBar').on('click', '.genre', function(event) {
    $(this).siblings(".genre").removeClass("active");
    $(this).toggleClass('active');
    var currentTab = $(this).attr('id');
    $('#content').empty('');
    movieQuery(currentTab);

});

// click on header to go back to main page

$('header').click(function(event) {
    $('.genre').removeClass('active');
    $('.top20-container').removeClass('hidden');
    $('.movie-container').addClass('hidden');
});

// click on arrow down to expand movie details

$('#container').on('click', 'p.expand-details', function(event) {
    var movieId = $(this).attr('id');
    $("#" + movieId).toggleClass('active');
    $('.' + movieId).toggleClass('active');
});

// implement handlebars - home-template

<<<<<<< HEAD
//Made a (probably pointless) constructor

<<<<<<< HEAD
function MovieDetails(movieObject) {
  console.log(movieObject);
  this.info = {
    movieId: movieObject.movie_info.id,
    title: movieObject.movie_info.title,
    overview: movieObject.movie_info.url,
    release: movieObject.movie_info.release_date,
    movieRating: movieObject.rating,
    poster: getposter(this.title)
  };
  console.log(movieObject);
    var source = $('#home-template').html();
    var template = Handlebars.compile(source);
    var context = {
        rating: this.movieRating,
         moviePoster: this.poster,
        releaseDate: this.release,
        movieTitle: this.title,
        overview: this.overview,
        movieId: this.movieId,
=======
=======
>>>>>>> master
function populateMovies(movieObject) {
    console.log(movieObject);
    var source = $('#home-template').html();
    var template = Handlebars.compile(source);
    var context = {
        // rating: movieObject.rating,
        // moviePoster: poster,
<<<<<<< HEAD
        releaseDate: movieObject.movie_data.release_date,
        movieTitle: movieObject.movie_data.title,
        overview: movieObject.movie_data.url,
        movieId: movieObject.movie_data.id
>>>>>>> master
=======
        releaseDate: movieObject.release_date,
        movieTitle: movieObject.title,
        overview: movieObject.url,
        movieId: movieObject.id
>>>>>>> master
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

// implement handlebars - top20-template

function populateTop20(movieObject) {
    var source = $('#top20-template').html();
    var template = Handlebars.compile(source);
    var poster = this.poster_path;
    var context = {
        rating: movieObject.average_rating,
        // moviePoster: poster,
        movieTitle: movieObject.title,
        overview: movieObject.url
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

function populateErrors(errorObject) {
    var source = $('#error-template').html();
    var template = Handlebars.compile(source);
    var context = {
        errorType: errorObject,
        errorMessage: "Oh s*&%! Try again.",
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

// error handlers

function handleError(errorObject, textStatus, error) {
    $('#content').empty('');
<<<<<<< HEAD
    populateErrors(textStatus);
  }
=======
    console.log(errorObject);
    populateErrors(errorObject.status);
}
>>>>>>> master
