const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TweetSchema = new Schema({
    userName: { type: String },
    message: { type: String },
    messageID: { type: String },
    score: { type: Number },
    retweet: { type: Boolean },
    link: { type: String },
    comparative: { type: Number },
    hasClicked: { type: Boolean, default: false }
}, {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp
});

module.exports = mongoose.model('Tweet', TweetSchema);
