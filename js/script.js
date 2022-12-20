function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $wikipediaHeaderElem = $('#wikipedia-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street');
    var $city = $('#city');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street, city;

    $street.val(function(_, _){
        street = this.value;
    });

    $city.val(function(_, _){
        city = this.value;
    });

    // load streetview
    var location= street + "," + city;
    $greeting.text(`So you want to live at ${location}?`);
    var streetViewApiKey = "iamwithstupid";
    var streetviewApiPath = `http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location}&key=${streetViewApiKey}`;

    $body.append(`<img class="bgimg" src=${streetviewApiPath} />`);

    // load NY Times articles
    var nyTimesApiKey = "areyoutoo";
    var nyTimesApiPath = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${location}&api-key=${nyTimesApiKey}`;

    $.getJSON(nyTimesApiPath, function(data) {
        var items = [];
        $.each(data.response.docs, function( key, val ) {
            items.push(`<li class="article" id=${key}><a href=${val.web_url}>${val.headline.main}</a><p>${val.snippet}</p></li>`);
        });
        
        $( "<ul/>", {
            "id": $nytElem,
            html: items.join( "" )
        }).appendTo( $nytHeaderElem );
    }).fail(function() {
       $nytHeaderElem.html("New York Times Articles could not be loaded");
    });

    // load Wikipedia articles
    var wikipediaApiEndpoint = "https://en.wikipedia.org/w/api.php"
    var wikipediaApiParams = `action=opensearch&search=${city}&limit=10&format=json&origin=*`;
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax( {
        type: "GET",
        url: `${wikipediaApiEndpoint}?${wikipediaApiParams}`,
        success: function(data, _, _) {
            var items = [];
            for(i=0; i<data.length; i++) {
                var title = data[1][i]
                if(title) {
                    var link = data[3][i]
                    items.push(`<li class="wiki-articles" id=${i}><a href=${link}>${title}</a></li>`);
                }
            }
            $( "<ul/>", {
                "id": $wikiElem,
                html: items.join( "" )
            }).appendTo( $wikipediaHeaderElem );

            clearTimeout(wikiRequestTimeout)
        }
    });
};

$('#form-container').submit(function(event) {
    loadData();
    event.preventDefault();
});