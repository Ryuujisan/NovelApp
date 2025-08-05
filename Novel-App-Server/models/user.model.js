import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fbID : {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    avatar:{
        type: String,
    },
    description:{
        type: String,
    },
    subscriptionSeries:{
        type: Array,
    },
    likeSeries:{
        type: Array,
    }
})

const User = mongoose.model("User",userSchema);
export default User;