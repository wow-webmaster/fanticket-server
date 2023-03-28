const mongoose = require('mongoose');

// Create Schema
const EventSchema = new mongoose.Schema({
    cover:{
        type:String,
        default:"uploads/event/default-cover.jpg",
    },
    status:{
        type:String,
        default:'inactive'
    },
    name:{
        type:String,
        default:""
    },
    facebookUrl:{
        type:String,
        default:"",
    },
    place:{
        type:String,
        default:""
    },
    dateTime:{
        type:Date,
        
    },
    containsTime:{
        type:Boolean,
        default:true,
    },
    registered: {
        type: Date,
        default: new Date(),
    },
    updated:{
        type:Date,
    },
    user:{
        type:mongoose.Types.ObjectId,
    }

});
module.exports = mongoose.model("event", EventSchema);
