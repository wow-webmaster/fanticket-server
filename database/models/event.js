const mongoose = require("mongoose");

// Create Schema
const EventSchema = new mongoose.Schema({
  cover: {
    type: String,
    default: "uploads/events/default-cover.jpg",
  },
  status: {
    type: String,
    default: "inactive",
  },
  name: {
    type: String,
    default: "",
  },
  facebookUrl: {
    type: String,
    default: "",
  },
  place: {
    type: String,
    default: "",
  },
  dateTime: {
    type: Date,
  },
  containsTime: {
    type: Boolean,
    default: true,
  },
  registered: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
  },
  ended: {
    type: Boolean,
    default: false,
  },
  canceled: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  types: {
    type: Array,
    default: [
      // name, price, dateTime, typeId, canceled
    ],
  },
});
module.exports = mongoose.model("event", EventSchema);
