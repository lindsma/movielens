
// On first keypress, ajax search request is made.

$('#userInput').on("keyup", function(event) {
  if ($('#userInput').val().length > 2) {
 event.preventDefault();
 var searchString = $('#userInput').val();
movieSearch(searchString);
}
});


//After first keypress, this function takes over.

 var $rows = $('.movies');
 $('#userInput').keyup(function() {
     var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

     $rows.show().filter(function() {
         var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
         return !~text.indexOf(val);
     }).hide();
 });

 //if enter is pressed, the specific movie is searched

 $('#userInput').keypress(function (event) {
   var searchString = $('#userInput').val();
   if (event.which == 13) {
     movieSearch(searchString);
     return false;
   }
 });


//Test Ajax for Fitch. Right now just for Horror.

   var searchbar = $("#userInput").val("");
    $.ajax({
      "method": "GET",
       "url": "api/genre/horror",
       "data":{},
       "datatype": "json",
       "success": function(data) {
         for (var index = 0; index < data.length; index++) {
        populateMovies(data[index]);
   }
       }

      });

      //NavBar gernre reguests

      function movieQuery(response) {
        $.ajax({
          "method": "GET",
           "url": "../api/genre/" + response,
           "data":{},
           "datatype": "json",
           "success": function(data) {
             for (var index = 0; index < data.length; index++) {
            populateMovies(data[index]);
          }
      }
    });
    var apiKey =  'aecec41c5b24a3cdd29ce5c1491c5040';
    var titlePoster = this.data[index].title.replace(/ *\([^)]*\) */g, "");
     console.log(titlePoster);
     var settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(titlePoster) + "&api_key=" + apiKey,
       "method": "GET",
       "processData": false,
       "data": "{}"
     };
     $.ajax(settings).done(function(response) {
        poster = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + response.results[0].poster_path;
     });
    console.log(poster);
    }




 // rate movie

 function rateMovie(movieId, movieRating) {
   if (movieRating === 'delete') {
     deleteRating(movieId);
   } else {
  $.ajax({
    "method": "POST",
     "url": "/genre/horror",
     "data":{},
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
       "data":{},
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

// $('.navBar').on('click', '.genre', function(event) {
//     populateMovies();
//     var currentTab = $(this).attr('id');
//     $('#' + currentTab).toggleClass('active');
//     $('#content').empty('');
//     $('.top20-container').addClass('hidden');
//     $('.navBar').on('click', '.genre', function(event) {
//         var previousTab = currentTab;
//         currentTab = $(this).attr('id');
//         $('#' + previousTab).removeClass('active');
//         $('#' + currentTab).addClass('active');
//     });
// });

$('#action').click( function(event) {
    $(this).toggleClass('active');

    movieQuery("action");
    var currentTab = $(this).attr('id');
    $('#content').empty('');
    $('.top20-container').addClass('hidden');
    console.log("HEY");
    $('.navBar').on('click', '.genre', function(event) {
        var previousTab = currentTab;
        currentTab = $(this).attr('id');
        $('#' + previousTab).removeClass('active');
        $('#' + currentTab).addClass('active');
        console.log("NAY");
    });
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
    $('.movie-details').toggleClass('active');
});

// implement handlebars - home-template


function populateMovies() {
    var source = $('#home-template').html();
    var template = Handlebars.compile(source);
    var poster = this.poster;
    var context = {
        avgRating: "8.5",
        // moviePoster: poster,
        moviePoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg" ,
        movieTitle: "Halloween",
        overview: "synopsis"
    };
    var html = template(context);
    $(html).insertAfter("#search");
}


// implement handlebars - top20-template

function populateTop20() {
    var source = $('#top20-template').html();
    var template = Handlebars.compile(source);
    var poster = this.poster;
    var context = {
        avgRating: "8.5",
        // moviePoster: poster,
        moviePoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg",
        movieTitle: "Halloween",
        overview: "synopsis"
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

function populateErrors() {
    var source = $('#error-template').html();
    var template = Handlebars.compile(source);
    var context = {
        errorType: "404",
        errorMessage: "Oh s*&%! Try again.",
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

// error handlers

function handleError(errorObject, textStatus, error) {
        console.log(errorObject, textStatus, error);
        populateErrors();
    }

// handleError();
// populateMovies();
movieQuery("star wars");
populateTop20();

// nav event handlers

// $("#action").on("click", function() {
//    movieQuery("action");
// });
// $("#horror").on("click", function() {
//    movieQuery("horror");
// });
// $("#comedy").on("click", function() {
//    movieQuery("comedy");
// });
// $("#fantasy").on("click", function() {
//    movieQuery("fantasy");
// });
// $("#drama").on("click", function() {
//    movieQuery("drama");
// });
// $("ul li:nth-child(6)").on("click", function() {
//    movieQuery();
// });
