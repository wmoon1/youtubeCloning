import mongoose from "mongoose";
import bcrypt from "bcrypt"

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxLength: 80 },
    fileUrl: {type: String, required: true},
    description: {type: String, required: true, trim: true, minLength: 20},
    createdAt: {type: Date, required: true, default: Date.now},
    hashtags: [{ type: String, trim: true }],
    meta: {
        views:{type:Number, default: 0, required: true},
        rating:{type:Number, default: 0, required: true},
    },
    comments: [{type:mongoose.Schema.Types.ObjectId, requried: true, ref: "Comment"}],
    owner: {type:mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
});

videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags
    .split(",")
    .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;