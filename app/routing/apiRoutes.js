// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    if (friends.length > 0) {
        // init minDifference with the totalDifference between the current user and the first
        // user in the friend Array
        var matchIndex = 0;
        var minDifference = caculateTotalDifference(req.body.scores, friends[0].scores);

        // calculate the totalDifference between current user's scores against those from the rest of 
        // other users and set the matchIndex of the user that with the least amount of difference
        for (var i = 1; i < friends.length; i++) {
            var currTotalDifference = caculateTotalDifference(req.body.scores, friends[i].scores);
            // b = (b > a) ?  a : b;
            // if the friend of the current index has the fewer amount of difference
            // reset minDifference and matchIndex with the current friend index and currTotalDifference
            if (minDifference > currTotalDifference) {
                minDifference = currTotalDifference;
                matchIndex = i;
            }
        }

        friends.push(req.body);

        // send the matched friend information as a JSON object
        res.json(friends[matchIndex]);
    } else {
        // send the current user as a JSON object due to lack of other user info
        friends.push(req.body);
        res.json(friends[0]);
    }
});
};

// Compare the difference between scores A against scores B, question by question. 
// Add up the differences to calculate the totalDifference.
function caculateTotalDifference(scoresA, scoresB) {
    var totalDifference = 0;
    for (var i = 0; i < scoresA.length; i++) {
        totalDifference += Math.abs(scoresA[i] - scoresB[i]);
    }
    // console.log("totalDifference: " + totalDifference);
    return totalDifference;
}