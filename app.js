$(document).ready(function () {
    $('.js-result').hide();
    $('#js-back').hide();

    $('.js-dj').click(function () {
        var value = $(this).text(); //get text value from the click
        getArtistIdByAtristName(value);
        $('.js-result').show();
        $('.js-content').hide();
        $('#js-back').show();
        $('.js-introduction').hide();
        $('.js-heading').hide();
    });

    $('#js-back').click(function () {
        $('.js-result').hide();
        $('#js-back').hide();
        $('.js-content').show();
        $('.js-introduction').show();
        $('.js-heading').show();
    });

});

function getArtistIdByAtristName(artistName) {
    /* Update all the parameters for your API test*/
    var params = {
        q: artistName,
        limit: 1,
        type: 'artist'
    };
    var result = $.ajax({
            /* update API end point */
            url: "https://api.spotify.com/v1/search",
            data: params,
            dataType: "json",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */

            var artistID = result.artists.items[0].id;
            getRelatedTracksByArtistID(artistID, artistName);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}

function getRelatedTracksByArtistID(artistID, artistName) {

    /* Update all the parameters for your API test*/
    var result = $.ajax({
            /* update API end point */
            url: "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=us",
            dataType: "json",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            displaySearchResults(result, artistName);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}

function displaySearchResults(relatedTracks, artistName) {
    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";
    buildTheHtmlOutput += "<h3>" + artistName + "'s sample tracks</h3>";

    $.each(relatedTracks.tracks, function (relatedTracksKey, relatedTracksValue) {
        if (relatedTracksKey < 9) {
            //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
            buildTheHtmlOutput += "<li class= list>";
            buildTheHtmlOutput += "<p class=title>" + relatedTracksValue.name + "</p>"; //output vide title
            buildTheHtmlOutput += "<a class=preview href='" + relatedTracksValue.preview_url + "'control'>"; //taget blank is going to open the video in a new window
            buildTheHtmlOutput += "<span><i class='fa fa-play-circle' aria-hidden='true'></i></span>"; //display video's thumbnail
            buildTheHtmlOutput += "<img class=images src='" + relatedTracksValue.album.images[0].url + "'/>"; //display video's thumbnail
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";
        }
    });

    //use the HTML output to show it in the index.html
    $(".js-result ul").html(buildTheHtmlOutput);
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
