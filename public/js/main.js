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
    $.ajax({
        "method": "GET",
        // "url": "/api/get_movies/" + encodeURIComponent(searchString),
        "url": 'https://shielded-taiga-96422.herokuapp.com/api/get_movies/' + encodeURIComponent(searchString),
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

//NavBar genre requests

function movieQuery(response) {
    $.ajax({
        "method": "GET",
        "url": 'https://shielded-taiga-96422.herokuapp.com/api/genre/' + response,
        "data": {},
        "datatype": "json",
        "success": function(data) {
            for (var index = 0; index < 20; index++) {
                new MovieDetails(data[index]);
            }
        },
        "error": handleError
    });
}

// 20 random movies
function top20() {
    $.ajax({
        "method": "GET",
        // "url": "/api/get_movies/" + encodeURIComponent(searchString),
        "url": 'https://shielded-taiga-96422.herokuapp.com/api/all-movies',
        "data": {},
        "datatype": "json",
        "success": function(data) {
            //for (var index = 0; data.length; index++) {
            //  console.log(data);
                //new MovieDetails(data.movie_data[index]);
                shuffle(data);
            //}
        },
        "error": handleError
    });
}

//Zach stole this and adapted it... It shuffles the entire movie array then olny displays 20.
function shuffle(data) {
  var currentIndex = data.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = data[currentIndex];
    data[currentIndex] = data[randomIndex];
    data[randomIndex] = temporaryValue;
  }
    newArray = data;

      function populate(newArray) {
        for (var index = 0; index < 20; index++) {
            new RandomDetails(newArray[index]);
      }
 }
 populate(newArray);
 }

 // implement handlebars - top20-template

 function RandomDetails(movieObject) {
     this.info = {
         movieId: movieObject.id,
         title: movieObject.title,
         overview: movieObject.url,
         release: movieObject.release_date
             //movieRating: movieObject.rating,
             //  poster: getposter(this.title, this)
     };

 this.populate20 = function(movieObject) {
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
     $(html).prependTo("#content");
 };
 this.populate20(movieObject);
 }




// movie object constructer

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
        $(html).prependTo("#content").fadeIn();
    };
    this.MagicElements(movieObject);
}


// get poster from the movie database

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
       return ("https://image.tmdb.org/t/p/w500/" + response.results[0].poster_path);

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

// toggle classes

// click on genre, populate with genre movies

$('.navBar').on('click', '.genre', function(event) {
    $(this).siblings(".genre").removeClass("active");
    $(this).toggleClass('active');
    var currentTab = $(this).attr('id');
    $('#content').empty();
    movieQuery(currentTab);
});

// click on header to go back to main page

$('header').click(function(event) {
    $("#content").empty();
    $('.genre').removeClass('active');
    top20();
});

// click on arrow down to expand movie details

$('#container').on('click', 'p.expand-details', function(event) {
    var movieId = $(this).attr('id');
    $("#" + movieId).toggleClass('active');
    $('.' + movieId).toggleClass('active');
    var title = $(this).find(".movie-title").text();
    console.log(title);
});


// error handlers

function handleError(errorObject, textStatus, error) {
    $('#content').empty();
    console.log(errorObject);
    populateErrors(errorObject.status);
}


// implement handlebars - error template

function populateErrors(errorObject) {
    var source = $('#error-template').html();
    var template = Handlebars.compile(source);
    var context = {
        errorType: errorObject,
        errorMessage: "Oh s*&%! Try again.",
    };
    var html = template(context);
    $(html).prependTo("#content");
}
top20();
