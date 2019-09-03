var topics = ["SeaHawks", "Seattle Sonics", "Seattle Sounders"];

function topicsButton (){
    $("#topics").empty();
    for (i=0; i < topics.length; i++){
    var topicButton = $("<button>");
    topicButton.addClass("topic-btn btn btn-primary btn-lg")
    topicButton.attr("topic", topics[i]);
    topicButton.text(topics[i]);
    $("#topics").append(topicButton);
    }
}

topicsButton(topics);

$(document).on("click", ".topic-btn", function() {
    $("#gifs-appear-here").empty();
    // In this case, the "this" keyword refers to the button that was clicked
    var topicName = $(this).attr("topic");
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
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div class='image-content'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.addClass("image-btn");

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

$(document).on("click",".image-btn", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    $(this).attr("id", 'animate-btn');
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    $(this).attr("id", 'state-btn')
  }
});

$("#addSearch").on("click", function(event){
  event.preventDefault();
  var newSearch = $("input").eq(0).val();
  var emptyinput = document.forms["search-form"]["search-input"].value;
  if (emptyinput == ""){
    alert("Please input your favorite Sport team"); 
  } else{
    topics.push(newSearch);
    topicsButton(topics);
    console.log(topics);
    return false;

  }

})