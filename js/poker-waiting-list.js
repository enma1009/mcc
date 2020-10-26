/**
 * Created by lescobar on 9/17/15.
 */

// API Configuration
var key = 'd98cec29-8a1e-449f-851f-4bc349f3bff4';
var url = 'https://www.pokeratlas.com/api/live_cash_games?key=' + key;
var includeDetail = true;
//

$(function () {
    var fullURL = url;
    $.ajax({
        url: fullURL,
        cache: false,
        error: function (xhr, status, error) {
            console.log(error);
            $("#loadingPokerData").html("<div style='font-size: 0.8em; color: #e2e29a;'><i class='fa fa-exclamation-triangle'></i>&nbsp;There is no data avaiable right now.<br>Please try again later.</div>");
            $('#lastUpdated').html('');
        },
        timeout: 10000,
        success: showWaitList
    });
    function IsNullOrWhiteSpace(string) {
        if (string === undefined || string === "" || string === null)
            return(true);
        return (false);
    }
    function showWaitList(data) {
        console.log(data);
        if (IsNullOrWhiteSpace(data))
            return;
        try {
            if (data.length < 1)
                return;
            var len = data.length;
            $("#waitList").append('<tr class="text-uppercase"><th scope="col">Name</th><th scope="col">Tables</th><th scope="col">Waiting</th><th scope="col">Interest</th></tr>');
            for (var i = 0; i < len; i++) {
                var wData = data[i];
                if (i == 0) {
                    if (wData.updated_at_local != null) {
                        var updatedTime = moment(wData.updated_at_local);
                        $('#lastUpdated').append("Last Updated: " + updatedTime.format("MMMM D, YYYY, h:mma"));
                    }
                }
                if (wData.active) {
                    switch (wData.interest) {
                        case false:
                            $("#loadingPokerData").html('');
                            $("#waitList").append("<tr><th scope='row'>" + wData.game_name + "</th><td>" + wData.tables + "</td><td>" + wData.waiting + "</td><td>&#160;</td></tr>");
                            break;
                        case true:
                            $("#loadingPokerData").html('');
                            $("#waitList").append("<tr><th scope='row'>" + wData.game_name + "</th><td>" + wData.tables + "</td><td>&#160;</td><td>" + wData.waiting + "</td></tr>");
                            break;
                    }
                }
            }
        } catch (e) {
            $("#loadingPokerData").html("Display Error:" + e.toString());
        }
    }
});
