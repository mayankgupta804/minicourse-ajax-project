
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

    $("#street").val(function(_, value){
        street = this.value;
    });

    $("#city").val(function(_, value){
        city = this.value;
    });

    // load streetview
    var location= street + "," + city;
    var streetViewApiKey = "iamwithstupid";

    var streetviewApiPath = `http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location}&key=${streetViewApiKey}`;

    $body.append(`<img class="bgimg" src=${streetviewApiPath} />`);
};

$('#form-container').submit(function(event) {
    loadData();
    event.preventDefault();
});