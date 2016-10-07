var $rows = $('.movies');
$('#userInput').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

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

// toggle classes

$('.navBar').on('click', '.genre', function(event) {
  console.log(this);

  var genre = $(this).attr('id');
  $('#' + genre).toggleClass('active');

});
