var Joke = require('./Joke');


function showJokes() {
    var cors_proxy = "https://cors-anywhere.herokuapp.com/";
    $( ".showSetup" ).empty();
    $( ".showDelivery" ).empty();

    $.ajax({
    type: "GET",
    dataType: 'JSON',
    url: cors_proxy +
    
    "https://sv443.net/jokeapi/v2/joke/Any?type=twopart"

    }).done(function(response) {
    console.log("success");
    console.log(response);
    console.log(response.setup);
    $(".showSetup").append("<p class='setup'>" +
    response.setup + "</p>");

    $(".showDelivery").append("<p class='delivery'>" +
    response.delivery + "</p>");

    const newJoke = new Joke({ 

        setup: response.setup,
        delivery: response.delivery

    });

    newJoke.save().then(console.log("Saved!"));

    
    })

}

setInterval(showJokes,1000 * 60 * 5);





