const fs = require("fs");
const {
  saveNewTicket,
  saveTicketEventQuery,
  getSavedTicketQuery,
  getTicketByIdQuery,
  saveTicketNoteQuery,
  saveTicketPriceQuery,
  finializeTicketQuery,
  getTicketDetailQuery,
} = require("../../../database/queries/ticketQuery");
const {
  getTicketOwnerInformation,
} = require("../../../database/queries/userQuery");
const { i18n } = require("../../../i18n");
const ResponseData = require("../../../util/ResponseData");
const { loadPdfFile } = require("../../../util/TicketPdfParser");

const getTicketDetail = async (req, res) => {
  try {
    const result = await getTicketDetailQuery({ ticketId: req.params.ticketId });
    let uploader = null;
    if (result.success && result.ticket) {
      uploader = await getTicketOwnerInformation({
        uploader: result.ticket.uploader,
      });
    }

    return ResponseData.ok(res, "", { ticket: result.ticket, uploader });
  } catch (err) {
    return ResponseData.error(res, i18n(res.language, "error.db"), err);
  }
};
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
        ticket.dateTime = result.data.dateTime;
        ticket.seat = result.data.seat;
        ticket.qrcode = result.data.qrcode;
        ticket.uploadedFile = req.file.path;
        ticket.ticketSavedStep = 2;
        ticket.originFile = req.body.originFile;
        await ticket.save();
        return ResponseData.ok(res, "", ticket);
      } else {
        const path = `${__dirname}/../../../${req.file.path}`;
        try {
          console.log(path);
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
const uploadTicketAvatar = async (req, res) => {
  try {
    const ticket = await getTicketByIdQuery(req.body.ticketId);

    if (req.file && ticket != null) {
      ticket.avatar = req.file.path;
      ticket.ticketSavedStep = 5;
      await ticket.save();
      return ResponseData.ok(res, "", ticket);
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
const resetTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;
    const ticket = await getTicketByIdQuery(ticketId);
    if (ticket != null) {
      if (ticket?.uploadedFile) {
        const path = `${__dirname}/../../../${ticket?.uploadedFile}`;
        const avatar = `${__dirname}/../../../${ticket?.avatar}`;
        try {
          fs.unlinkSync(path);
          fs.unlinkSync(avatar);
        } catch (err) {
          console.log(err);
        }
      }
      await ticket.delete();
    }
    return ResponseData.ok(res, i18n(req.language, "success.reset_ticket"));
  } catch (err) {
    return ResponseData.error(res, i18n(req.language, "error.db"), err);
  }
};
const saveTicketPrice = async (req, res) => {
  try {
    const { ticketId, sellPrice, seat, qrcode } = req.body;
    const ticket = await saveTicketPriceQuery({
      ticketId,
      sellPrice,
      seat,
      qrcode,
    });
    return ResponseData.ok(res, "", ticket);
  } catch (err) {
    return ResponseData.error(res, i18n(req.language, "error.db"), err);
  }
};
const finializeTicket = async (req, res) => {
  try {
    await finializeTicketQuery({ ticketId: req.body.ticketId });

    return ResponseData.ok(res, "");
  } catch (err) {
    return ResponseData.error(res, i18n(req.language, "error.db"), err);
  }
};
const saveTicketEvent = async (req, res) => {
  try {
    const { eventId, typeId, dateTime } = req.body;
    const uploader = req.user?._id;

    const result = await saveTicketEventQuery({
      eventId,
      eventTypeId: typeId,
      uploader,
      dateTime: new Date(Date.now() + 3600 * 24 * 30 * 1000),
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

const saveTicketNote = async (req, res) => {
  try {
    const { ticketId, note } = req.body;
    const ticket = await saveTicketNoteQuery({ ticketId, note });
    return ResponseData.ok(res, "", ticket);
  } catch (err) {
    return ResponseData.error(res, i18n(req.language, "error.db"), err);
  }
};
module.exports = {
  saveTicketEvent,
  getSavedTicket,
  saveTicketFile,
  uploadTicket,
  saveTicketNote,
  saveTicketPrice,
  uploadTicketAvatar,
  resetTicket,
  finializeTicket,
  getTicketDetail
};
