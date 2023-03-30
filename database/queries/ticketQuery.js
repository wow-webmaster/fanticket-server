const { default: mongoose } = require("mongoose");
const EventModel = require("../models/event");
const TicketModel = require("../models/ticket");

const saveTicketEventQuery = async ({ uploader, eventId, eventTypeId }) => {
  try {
    await TicketModel.findOneAndUpdate(
      { uploader: mongoose.Types.ObjectId(uploader), status: "building" },
      {
        $set: {
          uploader: mongoose.Types.ObjectId(uploader),
          eventId: mongoose.Types.ObjectId(eventId),
          eventTypeId: mongoose.Types.ObjectId(eventTypeId),
        },
      },
      { upsert: true, new: true }
    );
    return await getSavedTicketQuery({ uploader });
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};
const getSavedTicketQuery = async ({ uploader }) => {
  try {
    const ticket = await TicketModel.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $match: {
          uploader: mongoose.Types.ObjectId(uploader),
          status: "building",
        },
      },
    ]);
    if (ticket && ticket.length > 0)
      return { success: true, ticket: ticket[0] };
    else return { success: true, ticket: null };
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};
const getTicketByIdQuery = async (id) => {
  return await TicketModel.findById(id);
};
module.exports = {
  saveTicketEventQuery,
  getSavedTicketQuery,
  getTicketByIdQuery
};
