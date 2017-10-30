const sentiment = require("sentiment");

exports.analyzeText = function(text) {
    return sentiment(text);
}
