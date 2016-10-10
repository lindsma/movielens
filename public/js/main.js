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
        $(html).prependTo("#content");
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
});

// click on arrow down to expand movie details

$('#container').on('click', 'p.expand-details', function(event) {
    var movieId = $(this).attr('id');
    $("#" + movieId).toggleClass('active');
    $('.' + movieId).toggleClass('active');
});

// error handlers

function handleError(errorObject, textStatus, error) {
    $('#content').empty();
    console.log(errorObject);
    populateErrors(errorObject.status);
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
