import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    avatarUrl: String,
    socialOnly: {type: Boolean, default: false},
    username: {type: String, required: true, unique: true},
    password: {type: String},
    name:{type: String, required: true},
    location: String,
    comments: [{type:mongoose.Schema.Types.ObjectId, required: true, ref: "Comment"}],
    videos: [
        {type:mongoose.Schema.Types.ObjectId, ref: "Video"}
    ],
});

userSchema.pre("save", async function() {
    // not using 'this.ismodified', 
    // the password hash has been changed in mongoDB so that cannot login it when I create the Id and upload the video
    // so we can use it.
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5);
    }
})

const User = mongoose.model('User', userSchema);
export default User;