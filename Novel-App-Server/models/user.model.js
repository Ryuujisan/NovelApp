import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fbID : {
        type: String,
        required: true,
        unique: true,
    },
    gender : {
        type: String,
    },
    birthday : {
        type: String,
    },
    location : {
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