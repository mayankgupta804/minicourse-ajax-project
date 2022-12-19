
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street');
    var $city = $('#city');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street, city;

    $street.val(function(_, value){
        street = this.value;
    });

    $city.val(function(_, value){
        city = this.value;
    });

    // load streetview
    var location= street + "," + city;
    $greeting.text(`So you want to live at ${location}?`);
    var streetViewApiKey = "iamwithstupid";
    var streetviewApiPath = `http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location}&key=${streetViewApiKey}`;

    // load NY Times articles
    var nyTimesApiKey = "areyoutoo";
    var nyTimesApiPath = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${location}&api-key=${nyTimesApiKey}`;

    $.getJSON(nyTimesApiPath, function(data) {
        var items = [];
        $.each(data.response.docs, function( key, val ) {
            items.push( "<li class='article' id='" + key + "'>" + 
            "<a href="+ val.web_url + ">" + val.headline.main + "</a>" +
            "<p>" + val.snippet + "</p>" + 
            "</li>" );
        });
        $( "<ul/>", {
            "id": "#nytimes-articles",
            html: items.join( "" )
        }).appendTo( $nytHeaderElem );
    });

    $body.append(`<img class="bgimg" src=${streetviewApiPath} />`);
};

$('#form-container').submit(function(event) {
    loadData();
    event.preventDefault();
});