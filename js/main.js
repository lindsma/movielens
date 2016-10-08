console.log("test");
var $rows = $('.movies');
$('#userInput').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

// nav event handlers

$("#action").on("click", function() {
    movieQuery();
});
$("#horror").on("click", function() {
    movieQuery();
});
$("#comedy").on("click", function() {
    movieQuery();
});
$("#fantasy").on("click", function() {
    movieQuery();
});
$("#drama").on("click", function() {
    movieQuery();
});
$("ul li:nth-child(6)").on("click", function() {
    movieQuery();
});

//beginings of searchbar function

var searchbar = $("#userInput").val("");

function movieQuery() {

    $.ajax({
        url: "/Public/api/genre/horror",
        dataType: "text/json",
        method: "GET",
    }).done(function(response) {
        //or (var index = 0; response.data.length; index++) {
            //new targetInfo(response.data[index]);
            console.log(response);

    });
}
movieQuery();


var apiKey =  '84d2690223f00a8cc05141e0c91c56b8';

function movieSearch() {
  var settings = {
    "url": "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(searchString) + "&api_key=" + apiKey,
    "method": "GET",
    "processData": false,
    "data": "{}"
  };
//console.log(settings);

    $.ajax(settings).done(function(response) {
    return(movieObject.poster_path);
  });
  //console.log(movieObject.poster_path);
}

movieSearch();


//var  poster =  'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movieObject.poster_path;










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