const mongoose = require('mongoose');

// Create Schema
const UserShema = new mongoose.Schema({
    avatar:{
        type:String,
        default:"/uploads/avatar/default.png"
    },
    status:{
        type:String,
        default:'active'
    },
    emailVerification:{
        type:Boolean,
        default:false
    },
    email: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    phoneVerification:{
        type:Boolean,
        default:false
    },
    fullName: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    cfp: {
        type: String,
        default: "",
    },
    
    siteRole: {
        type: String,
        default: "user",
    },
    
    registered: {
        type: Date,
        default: new Date(),
    },
    updated:{
        type:Date,
    },
    social:{
        type:Object,
        default:{
            facebook:"",
            twitter:"",
            youtube:"",
        }
    },
    address:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:''
    }

});
module.exports = mongoose.model("user", UserShema);
