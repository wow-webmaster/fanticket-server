const { addNewTicket } = require("../../../database/queries/ticketQuery");
const {
  addEventQuery,
  getAvailableEvents,
  addNewEventTypeQuery,
  getEventDetailQuery,
} = require("../../../database/queries/eventQuery");
const { i18n } = require("../../../i18n");
const ResponseData = require("../../../util/ResponseData");

const addEvent = async (req, res) => {
  try {
    const user = req.user._id;
    const payload = {
      ...req.body,
      user,
    };
    const event = await addEventQuery(payload);
    return ResponseData.ok(res, i18n(req.language, "event.add_event"), event);
  } catch (err) {
    console.log(err);
    return ResponseData.error(res, i18n(req.language, "error.500"), err);
  }
};
const getAllEvents = async (req, res) => {
  try {
    const events = await getAvailableEvents();
    return ResponseData.ok(res, "", events);
  } catch (err) {
    console.log(err);
    return ResponseData.error(res, i18n(req.language, "error.db"), err);
  }
};
const getEventDetail = async (req, res) => {
  try {
    const events = await getEventDetailQuery({ eventId: req.params.eventId });
    if (events != null && events.length > 0) {
      const event = events[0];
      return ResponseData.ok(res, "", event);
    }
    return ResponseData.ok(res, "", null);
  } catch (err) {
    console.log(err);
    return ResponseData.error(res, i18n(req.language, "error.db"), err);
  }
};
const addNewEventType = async (req, res) => {
  try {
    const { id, name, price, dateTime } = req.body;
    const event = await addNewEventTypeQuery(id, {
      name,
      price,
      dateTime: new Date(dateTime),
    });
    if (event != null)
      return ResponseData.ok(res, i18n(req.language, "success.200"), event);
    else
      return ResponseData.error(res, i18n(req.language, "error.db"), {
        err: event,
      });
  } catch (err) {
    return ResponseData.error(res, i18n(req.language, "error.500"), {
      err,
    });
  }
};
module.exports = {
  addEvent,
  getAllEvents,
  addNewEventType,
  getEventDetail,
};
