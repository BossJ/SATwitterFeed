const Tweet = require("../models/tweet"),
    appConfig = require("../config/twitterAPI"),
    twitter = require("twitter");

const Twitter = new twitter(appConfig);

function randomizer() {
    var rand = Math.random();
    if (rand < .5) {
        return 70000 - Math.floor(Math.random() * 20000);
    }
    return 70000 + Math.floor(Math.random() * 20000);

}


setInterval(function() {
    //var rand = Math.floor(Math.random() * 20);
    Tweet.findOne({}, function(err, tweet) {
        if (err) { console.log(err); }

        tweet.remove();
    });

}, randomizer());
