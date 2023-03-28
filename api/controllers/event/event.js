const { addEventQuery } = require("../../../database/queries/eventQuery");
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

module.exports = {
    addEvent
}
