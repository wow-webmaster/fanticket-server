const mongoose = require("mongoose");

// Create Schema
const TicketSchema = new mongoose.Schema({
  avatar:{
    type:String,
    default:"",
  },
  status: {
    type: String,
    default: "building",
  },
  eventId: {
    type: mongoose.Types.ObjectId,
  },
  eventTypeId: {
    type: mongoose.Types.ObjectId,
  },
  originPrice: {
    type: Number,
    default: 0,
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  uploader: {
    type: mongoose.Types.ObjectId,
  },
  buyer: {
    type: mongoose.Types.ObjectId,
  },
  uploaded: {
    type: Date,
    default: new Date(),
  },
  isAppTicket: {
    type: Boolean,
    default: false,
  },
  uploadedFile: {
    type: String,
    default: "",
  },
  originFile: {
    type: String,
    default: "",
  },
  ticketLink: {
    type: String,
    default: "",
  },
  ticketSavedStep: {
    type: Number,
    default: 0,
  },
  qrcode: {
    type: String,
    default: "",
  },
  seat:{
    type:String,
    default:""
  },
  note:{
    type:String,
    default:""
  },
  dateTime:{
    type:Date,
  }
});
module.exports = mongoose.model("ticket", TicketSchema);
