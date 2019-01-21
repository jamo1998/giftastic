//Array of topics
var topics = ["zelda", "mario", "luigi", "princess peach", "yoshi", "kirby",
    "link", "bowser", "samus",
];

$(document).ready(function () {
    function displayImg(){

        $(".characters").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=9PeVJM2geA9ZARdcF1VvqCh5kXFvJ7wf&limit=10"   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(response) {

            for(var i = 0; i < limit; i++) {    
            
                var image = $("<img>");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.attr("class", "gif col-lg-2 float-left");
                $(".characters").append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                $(".characters").append(pRating);

                $(".characters").append(image);
            }
        });
    }

    function renderButtons(){ 

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default show");
            newButton.attr("id", "button");
            newButton.attr("data-name", topics[i]); 
            newButton.text(topics[i]); 
            $("#buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#addCharacter").on("click", function(){

        var input = $("#character-input").val().trim();
        
        topics.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", ".show", displayImg);
    $(document).on("click", ".gif", imageChangeState);

});