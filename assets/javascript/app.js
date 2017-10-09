//====================================================================
//  Global Variables
//====================================================================

// Default array of cars
var cars = ["BMW", "Mercedes-Benz", "Rolls Royce", "Ferrari", "Audi", "Bugatti", 
            "Lamborghini", "Pagani", "Range Rover", "Maserati", "Porsche"];


//====================================================================
//  (document).ready()
//====================================================================
$(document).ready(function(){
    displayButtons();
});

//====================================================================
//  addButtons()
//====================================================================
function displayButtons() {

    $("#buttonsView").empty();
    for (var i = 0; i < cars.length; i++) 
    {
        var button = $('<button>');
        button.addClass("carButton");
        button.attr('name', cars[i]);
        button.text(cars[i]);
        $("#buttonsView").append(button);
    }
}

//====================================================================
//  Event handler for processing button clicks
//====================================================================
function addCar()
{
    event.preventDefault();
    var car = $("#carName").val().trim();
    cars.push(car);
    displayButtons();
}

//====================================================================
//  (document).onClick()
//====================================================================
$(document).on("click", ".carButton", getCarImages);
$(document).on("click", ".gif", toggleImageAnimation);

//====================================================================
//  getCarImages()
//====================================================================
function getCarImages() {
      
    $("#carImages").empty();

    var car = $(this).attr("name");
 
    // Constructing a URL to search Giphy for the name of the given topic, i.e. car
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing AJAX GET request
    $.ajax({
          url: queryURL,
          method: "GET"
    }).done(function(response) {

        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) 
        {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r") 
            {
                  // Creating a div with the class "item"
                  var gifDiv = $("<div class='img-thumbnail'>");

                  // Storing the result item's rating
                  var rating = results[i].rating;

                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + rating);
                  
                  var carImage = $("<img>");

                  // Giving the image attributes
                  carImage.attr("src", results[i].images.fixed_height_still.url);
                  carImage.attr("data-still", results[i].images.fixed_height_still.url);
                  carImage.attr("data-animate", results[i].images.fixed_height.url);
                  carImage.attr("class", "gif");
                  carImage.attr("data-state", "still");


                  // Appending the paragraph and personImage we created to the "gifDiv" div we created
                  gifDiv.append(p);
                  gifDiv.append(carImage);

                  // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                  $("#carImages").prepend(gifDiv);
            }
        }
    });
}

//====================================================================
//  toggleImageAnimation()
//====================================================================
function toggleImageAnimation()
{
      // Toggle the state of the image between "data-still" and "data-animate" 
      // Update the src of the image accordingly

      var state = $(this).attr("data-state");

      if (state === "still") 
      {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
      else 
      {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}