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



function movieQuery() {
    var searchbar = $("#userInput").val("");
    $.ajax({
        url: "api/genre/horror",
        dataType: "text/json",
        method: "GET",
    }).done(function(response) {
        for (var index = 0; response.data.length; index++) {
            new targetInfo(response.data[index]);
        }
    });
}
movieQuery();








// toggle classes

// click on genre, populate with genre movies

$('.navBar').on('click', '.genre', function(event) {
    var currentTab = $(this).attr('id');
    $('#' + currentTab).toggleClass('active');
    $('#content').empty('');
    $('.top20-container').addClass('hidden');
    $('.navBar').on('click', '.genre', function(event) {
        var previousTab = currentTab;
        currentTab = $(this).attr('id');
        $('#' + previousTab).removeClass('active');
        $('#' + currentTab).addClass('active');
    });
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
    var context = {
        movieTitle: "Halloween",
        avgRating: "8.5",
        releaseDate: "(1978)",
        genres: "horror",
        overview: "synopsis"
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

// implement handlebars - top20-template

function populateTop20() {
    var source = $('#top20-template').html();
    var template = Handlebars.compile(source);
    var context = {
        avgRating: "8.5",
        movieTitle: "Halloween",
        overview: "synopsis"
    };
    var html = template(context);
    $(html).insertAfter("#search");
}

populateMovies();
populateTop20();
