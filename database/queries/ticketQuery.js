const { default: mongoose } = require("mongoose");
const EventModel = require("../models/event");
const TicketModel = require("../models/ticket");

const finializeTicketQuery = async ({ ticketId }) => {
  try {
    await TicketModel.findByIdAndUpdate(ticketId, { status: "inprogress" });
  } catch (err) {
    throw new Error(err);
  }
};
const saveTicketEventQuery = async ({
  uploader,
  eventId,
  eventTypeId,
  dateTime,
}) => {
  try {
    await TicketModel.findOneAndUpdate(
      { uploader: mongoose.Types.ObjectId(uploader), status: "building" },
      {
        $set: {
          uploader: mongoose.Types.ObjectId(uploader),
          eventId: mongoose.Types.ObjectId(eventId),
          eventTypeId: mongoose.Types.ObjectId(eventTypeId),
          dateTime: new Date(dateTime),
          ticketSavedStep: 1,
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
const saveTicketNoteQuery = async ({ ticketId, note }) => {
  try {
    return await TicketModel.findByIdAndUpdate(
      ticketId,
      { note, ticketSavedStep: 3 },
      { new: true }
    );
  } catch (err) {
    throw new Error(err);
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
          dateTime: { $gte: new Date() },
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

const getTicketDetailQuery = async({ticketId})=>{
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
          _id:mongoose.Types.ObjectId(ticketId)
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
}
const getTicketByIdQuery = async (id) => {
  return await TicketModel.findById(id);
};
const saveTicketPriceQuery = async ({ ticketId, sellPrice, qrcode, seat }) => {
  try {
    return await TicketModel.findByIdAndUpdate(
      ticketId,
      { sellPrice, ticketSavedStep: 4, qrcode, seat },
      { new: true }
    );
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  saveTicketEventQuery,
  getSavedTicketQuery,
  getTicketByIdQuery,
  saveTicketNoteQuery,
  saveTicketPriceQuery,
  finializeTicketQuery,
  getTicketDetailQuery
};
