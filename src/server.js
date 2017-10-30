const twitter = require("twitter"),
    mongoose = require("mongoose"),
    appConfig = require("./config/twitterAPI"),
    dbConfig = require("./config/db"),
    express = require("express"),
    sentimentAnalysis = require("./controllers/sentiment"),
    Tweet = require("./models/tweet"),
    //runTweet = require("./controllers/runTweet"),
    app = express();

const Twitter = new twitter(appConfig);

mongoose.connect(dbConfig.DATABASE, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to db");
    }
});



// You can also get the stream in a callback if you prefer.
Twitter.stream('statuses/filter', { track: 'bath bomb, bath bombs, lush bath bomb, body scrub, soap bar, soap, bubble bath, hex bomb, bath scrub, organic', language: "en" }, function(stream) {
    stream.on('data', function(event) {
        if (event.user.screen_name != "sudzlysoaps") {
            var sentimentScore = sentimentAnalysis.analyzeText(event.text);
            var retweeted = false;
            if (event.retweeted_status) {
                retweeted = true;
            }
            let tweet = new Tweet({
                userName: "@" + event.user.screen_name,
                message: event.text,
                messageID: event.id_str,
                score: sentimentScore.score,
                retweet: retweeted,
                link: "http://twitter.com/" + event.user.screen_name + "/status/" + event.id_str,
                comparative: sentimentScore.comparative
            });

            tweet.save(function(err, tweet) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });

    stream.on('error', function(error) {
        throw error;
    });
});

app.listen(process.env.PORT || 8080, function(err) {
    if (err) throw err;
    console.log("server is now running");
});
