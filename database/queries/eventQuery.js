const { default: mongoose } = require("mongoose");
const EventModel = require("../models/event");

const addEventQuery = async (data) => {
  try {
    const event = await EventModel.create(data);
    return event;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const searchAvailableEvents = async () => {
  try {
    const events = await EventModel.aggregate([
      {
        $match: {
          dateTime: { $gte: new Date() },
        },
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "eventId",
          as: "tickets",
        },
      },
    ]);
    return events;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const getAvailableEvents = async () => {
  try {
    const events = await EventModel.aggregate([
      {
        $match: {
          dateTime: { $gte: new Date() },
        },
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "eventId",
          as: "tickets",
        },
      },
    ]);
    return events;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const addNewEventTypeQuery = async (id, newEventType) => {
  try {
    const event = await EventModel.findByIdAndUpdate(
      id,
      {
        $push: {
          types: {
            ...newEventType,
            typeId: new mongoose.Types.ObjectId(),
            canceled: false,
          },
        },
      },
      { new: true }
    );
    
    return event;
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = {
  addEventQuery,
  getAvailableEvents,
  addNewEventTypeQuery,
};
