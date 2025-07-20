import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
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