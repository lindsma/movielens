
// nav event handlers

$("#action").on("click", function() {
    movieQuery("action");
});
$("#horror").on("click", function() {
    movieQuery("horror");
});
$("#comedy").on("click", function() {
    movieQuery("comedy");
});
$("#fantasy").on("click", function() {
    movieQuery("fantasy");
});
$("#drama").on("click", function() {
    movieQuery("drama");
});
$("ul li:nth-child(6)").on("click", function() {
    movieQuery();
});

// On first keypress, ajax search request is made.

$('#userInput').one("keyup", function(event) {
  event.preventDefault();
  var searchString = $('#userInput').val();
  //$('#userInput').val('');
 movieSearch(searchString);
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


//Test Ajax for Fitch

function movieQuery(searchString) {
    var searchbar = $("#userInput").val("");
    $.ajax({
        url: "/api/genre/horror",
        dataType: "text/json",
        method: "GET",
    }).done(function(response) {
        for (var index = 0; response.length; index++) {
            populateMovies(response[index]);
        }
    });
}
movieQuery();

//If we're awesome, we'll get the movie title from fitch's database, then
//use it to search the movie database for a movie poster.

var apiKey =  'aecec41c5b24a3cdd29ce5c1491c5040';

function movieSearch(searchString) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(searchString) + "&api_key=" + apiKey,
    "method": "GET",
    "processData": false,
    "data": "{}"
  };

  $.ajax(settings).done(function(response) {
    return new MovieInfo(response.results[0]);
  });

}

//Movie poster is in this constructor. It needs to be added to populateMovies()

function MovieInfo(movieObject) {
  console.log(movieObject);
  this.info = {
    movieId: movieObject.id,
    title: movieObject.title,
    overview: movieObject.overview,
    poster: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movieObject.poster_path
  };
}












// toggle classes

$('.navBar').on('click', '.genre', function(event) {


 $(this).toggleClass('active');

});


// implement handlebars - home-template

function populateMovies() {

    var source = $('#home-template').html();
    var template = Handlebars.compile(source);
    var context = {
        testing: "hey",
    };
    var html = template(context);
    $('.movie-container').prepend(html);
}

// implement handlebars - top20-template

function populateTop20() {

    var source = $('#top20-template').html();
    var template = Handlebars.compile(source);
    var context = {
        testing: "hey again",
    };
    var html = template(context);
    $('.top20-container').prepend(html);
}

populateMovies();
populateTop20();
