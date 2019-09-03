$(function(){
    topicsButton(searchArray,"searchButton","#topics");
})


var searchArray = ["cat", "dog", "horse"];

function topicsButton (searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for (var i=0; i < searchArray.length; i++){
        var topicButton = $("<button>");
        topicButton.addClass(classToAdd)
        topicButton.attr("data type", searchArray[i]);
        topicButton.text(searchArray[i]);
        $(areaToAddTo).append(topicButton);
    }
}


$(document).on("click",".searchButton", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var topicName = $(this).data('type');
    console.log(topicName);

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topicName + "&api_key=5CBFiwG1O3ZZOWKBmEqbZ6MPgICPXYZ1&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .done(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var searchDiv = $('<div class="search-item">');

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var Image = $("<img>");
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            Image.attr("src", still);
            Image.attr("data-still", still);
            Image.attr("data-animate", animated);
            Image.attr("data-state", "still");
            Image.addClass("searchImage");

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            searchDiv.append(p);
            searchDiv.append(Image);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").append(searchDiv);
          }
        }
      });
  });

$("#addSearch").on("click", function(){
    var newSearch = $("input").eq(0).val();
    topics.push(newSearch);
    topicsButton(topics,"searchButton","#topics");
    console.log(topics);
    return false;
})


$(document).on("click", "gif", function() {
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
}
});