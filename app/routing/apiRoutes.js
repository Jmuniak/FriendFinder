

// ===============================================================================
// LOAD DATA
// ===============================================================================

const friends = require("../data/friends.js");
console.log(friends)


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests

    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        console.log("GET")
        res.json(friends);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        //  console.log("POST", req.body)

        var bestMatch = {
            name: "",
            photo: ""
        }
        var bestdif = 51
        var surveyScore = req.body.score
        console.log(surveyScore)

        for (var i = 0; i < friends.length; i++) {
            var dif = 0
            var friendScore = friends[i].scores
            for (var j = 0; j < friendScore.length; j++) {
                dif = dif + Math.abs(friendScore[j] - surveyScore[j])
            }
            if (dif < bestdif) {
                // try to use map in these loops
                bestMatch.name = friends[i].name
                bestMatch.photo = friends[i].photo
                bestdif = dif
            }
            // console.log(friends[i].name, dif)
        }

        // compare this array with every friends array 
        res.json(bestMatch)
    });

};
