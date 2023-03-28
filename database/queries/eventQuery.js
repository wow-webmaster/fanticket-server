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

const getAvailableEvents = async () => {
  try {
    const events = await EventModel.find({
      dateTime: { $gte: new Date() },
    });
    console.log(events);
    return events;
  } catch (err) {
    console.log(err);
    return [];
  }
};
module.exports = {
  addEventQuery,
};
