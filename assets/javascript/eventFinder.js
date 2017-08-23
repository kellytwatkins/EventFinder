// JavaScript source code
//APIs to use: Sqoot, TrailsAPI, potentially Meetups API, geocoding API,
//ids = city-input state-input zip-input button = submit
//meetups output: group name, event name, address, description, and image if possible

var sqootApi = "ovpws1";

var meetKey = "4c77123e5f7016b245c5de43306a";

var zipCode = "";
var radi = "";

var long = "";
var lati = "";
var city = "";
var state = "";
var userSearch = {};

$("#submit").on("click", function (event) {
    zipCode = $("#zip-input").val();
    radi = $('#radius').val();

})
function sqoot(done) {
    $("#dealsTBL").empty();
    $("#eventsTBL").empty();
    var sqootUrl = "https://api.sqoot.com/v2/deals?api_key=" + sqootApi + "&location=" + zipCode + "&page=1";
    $.ajax({
        url: sqootUrl,
        method: "GET"
    }).done(function (response) {
        var results = response.deals;
        var query = response.query;
        long = query.location.longitude;
        lati = query.location.latitude;
        city = query.location.locality;
        state = query.location.region;
        zipCode = query.location.postal_code;
        userSearch = {
            city: city,
            state: state,
            zipCode: zipCode,
            radius: radi
        };
        done();
        for (var d = 0; d < results.length; d++) {
            var newTBL = $("<tr id='dealsRow'>");
            newTBL.addClass("deal");
            var colIMG = $("<td>");
            var colInf = $("<td>");
            colIMG.addClass("col-md-2");
            colInf.addClass("col-md-10");
            colIMG.html("<img src='" + results[d].deal.image_url + "'/>");
            colInf.html("<a href='" + results[d].deal.url + "' target='_blank'>" + results[d].deal.title + "</a>");
            colIMG.appendTo(newTBL);
            colInf.appendTo(newTBL);
            newTBL.appendTo("#dealsTBL");
        }


        meetups();
    }).fail(function () {
        console.log("oop");
    }) 
}

function meetups() {
    var meetURL = "https://api.meetup.com/find/events?&sign=true&key=" + meetKey + "&photo-host=public&lon=" + long + "&lat=" + lati + "&page=1&radius=" + radi;
    $.ajax({
        url: meetURL,
        method: "GET",
        dataType: 'jsonp'
    }).done(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<tr id='eventsRow'>");
            newDiv.addClass("event");
            var month = moment(response.data[i].time).format("MMM");
            var day = moment(response.data[i].time).format("DD");
            var colDate = $("<td>");
            var colTxt = $("<td>");
            colDate.addClass("col-md-2");
            colTxt.addClass("col-md-10");
            colDate.html("<p>" + month + "</p><p>" + day + "</p>");
            colTxt.html("<a href ='" + response.data[i].link + "' target='_blank'>"+ response.data[i].name +"</a>");
            colDate.appendTo(newDiv);
            colTxt.appendTo(newDiv);
            newDiv.appendTo("#eventsTBL");
        }
    })
}