// On first keypress, ajax search request is made.

// $('#userInput').on("keyup", function(event) {
//     if ($('#userInput').val().length > 2) {
//         event.preventDefault();
//         var searchString = $('#userInput').val();
//         movieSearch(searchString);
//     }
// });


//After first keypress, this function takes over.

<<<<<<< HEAD
var $rows = $('#content');
=======
var movieObject = null;

var $rows = $('.movies');
>>>>>>> 1710e3c362f386a9c0cb152887442ac593b2c6d0
$('#userInput').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

//if enter is pressed, the specific movie is searched

$('#userInput').keypress(function(event) {
    var searchString = $('#userInput').val();
    if (event.which == 13) {
          movieSearch(searchString);
        return false;
    }
});


//search bar requests
function movieSearch(searchString) {
    var searchbar = $("#userInput").val("");
    var dataArray = [];
    $.ajax({
        "method": "GET",
        "url": "/api/get_movies/" + encodeURIComponent(searchString),
        "data": {},
        "datatype": "json",
        "success": function(data) {
          dataArray.push(data);
          console.log(dataArray);
          // for (var key in data) {
          //
          //   var movieObject = data;
          //   populateMovies(movieObject);
          //
          // }
        },
        "error": handleError
    });
}

//NavBar genre requests

function movieQuery(response) {
<<<<<<< HEAD
   $.ajax({
       "method": "GET",
       "url": "../api/genre/" + response,
       "data": {},
       "datatype": "json",
       "success": function(data) {
           for (var index = 0; index < data.length; index++) {
               var movieObject = data[index];
           }
       },
       "error": handleError
   });

 getRating(movieObject);
}

function getRating(movieObject) {

 var movieId = movieObject.id;

 console.log(movieId);

 $.ajax({
     "method": "GET",
     "url": "../api/avg-rating?search=" + encodeURIComponent(movieId),
     "data": {},
     "datatype": "json",
     "success": function(data) {
         var avgRating = data[0].average_rating;
         populateMovies(movieObject, avgRating);
         console.log(avgRating);
     },
     "error": handleError
 });
 console.log(avgRating);
 populateMovies(movieObject, avgRating);

}
    function getPoster(title) {
=======
    $.ajax({
        "method": "GET",
        "url": "../api/genre/" + response,
        "data": {},
        "datatype": "json",
        "success": function(data) {
            for (var index = 0; index < data.length; index++) {
                populateMovies(data[index]);
            }
        },
        "error": handleError
    });
}

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

<<<<<<< HEAD
<<<<<<< HEAD
function getPoster(title) {
>>>>>>> master
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
=======
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
>>>>>>> ec72717b0d434108a6c76140583458e05c11c3b7


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


// toggle classes

// click on genre, populate with genre movies

$('.navBar').on('click', '.genre', function(event) {
    $(this).siblings(".genre").removeClass("active");
    $(this).toggleClass('active');
    var currentTab = $(this).attr('id');
    $('#content').empty('');
    movieQuery(currentTab);

});
// error template testing !!!!!!!!!!!!

$('.search-icon').click(function(event) {
    $('.top20-container').addClass('hidden');
    $('.movie-container').addClass('hidden');
    $('.error-container').removeClass('hidden');
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
<<<<<<< HEAD
function populateMovies(movieObject) {
    $('#content').empty('');
=======
function populateMovies(movieObject, avgRating) {
    $('#content').empty('');
    console.log(avgRating);
>>>>>>> master
=======
function populateMovies(movieObject) {
<<<<<<< HEAD
    $('#content').empty('');
>>>>>>> master
=======
  console.log(movieObject);
>>>>>>> 1710e3c362f386a9c0cb152887442ac593b2c6d0
    var source = $('#home-template').html();
    var template = Handlebars.compile(source);
    var context = {
        rating: movieObject.rating,
        // moviePoster: poster,
        releaseDate: movieObject.movie_info.release_date,
        movieTitle: movieObject.movie_info.title,
        overview: movieObject.movie_info.url,
        movieId: movieObject.movie_info.id
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
    populateErrors(textStatus);
}
