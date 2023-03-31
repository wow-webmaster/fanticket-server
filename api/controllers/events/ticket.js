const fs = require("fs");
const {
  saveNewTicket,
  saveTicketEventQuery,
  getSavedTicketQuery,
  getTicketByIdQuery,
} = require("../../../database/queries/ticketQuery");
const { i18n } = require("../../../i18n");
const ResponseData = require("../../../util/ResponseData");
const { loadPdfFile } = require("../../../util/TicketPdfParser");

const saveTicketFile = async (req, res) => {
  try {
  } catch (err) {}
};
const uploadTicket = async (req, res) => {
  try {
    const ticket = await getTicketByIdQuery(req.body.ticketId);

    if (req.file && ticket != null) {
      // pdf file check
      const result = await loadPdfFile({ file: req.file });
      if (result.parse && result.data != null) {
        ticket.originPrice = result.data.originPrice;
        ticket.seat = result.data.seat;
        ticket.qrcode = result.data.qrcode;
        ticket.uploadedFile = req.file.path;
        ticket.ticketSavedStep = 1;
        ticket.originFile = req.body.originFile;
        await ticket.save();
        return ResponseData.ok(res, "", ticket);
      } else {
        const path = `${__dirname}/../../../${req.file.path}`;
        try {
          fs.unlinkSync(path);
        } catch (err) {
          console.log(err);
          console.log("could not unlink file");
        }
        return ResponseData.error(res, i18n(req.language, "error.parse-pdf"));
      }
    } else {
      return ResponseData.error(res, i18n(req.language, "error.upload"));
    }
  } catch (err) {
    return ResponseData.error(res, i18n("error.500"), err);
  }
};
const getSavedTicket = async (req, res) => {
  try {
    const result = await getSavedTicketQuery({ uploader: req.user?._id });
    if (result.success) {
      return ResponseData.ok(res, "", result.ticket);
    } else {
      return ResponseData.error(res, i18n("error.db"), result.err);
    }
  } catch (err) {
    return ResponseData.error(res, i18n("error.500"), err);
  }
};
const saveTicketEvent = async (req, res) => {
  try {
    const { eventId, typeId } = req.body;
    const uploader = req.user?._id;

    const result = await saveTicketEventQuery({
      eventId,
      eventTypeId: typeId,
      uploader,
    });
    if (result.success) {
      return ResponseData.ok(res, "", result.ticket);
    } else
      return ResponseData.error(res, i18n(req.language, "error.500"), {
        err: result.err,
      });
  } catch (err) {
    console.log(err);
    return ResponseData.error(res, i18n(req.language, "error.500"), err);
  }
};

module.exports = {
  saveTicketEvent,
  getSavedTicket,
  saveTicketFile,
  uploadTicket,
};
