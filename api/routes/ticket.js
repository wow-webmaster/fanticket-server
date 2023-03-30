const express = require("express");

const router = express.Router();
const authenticate = require("../../middleware/authenticated");
const languageMiddleware = require("../../middleware/language");
const { ticketUploader } = require("../../util/FileUploader");
const ticketController = require("../controllers/events/ticket");

router.post(
  "/save-ticket-event",
  languageMiddleware,
  authenticate,
  ticketController.saveTicketEvent
);
router.get(
  "/saved-ticket",
  languageMiddleware,
  authenticate,
  ticketController.getSavedTicket
);
router.post(
  "/upload",
  languageMiddleware,
  authenticate,
  ticketUploader.single("file"),
  ticketController.uploadTicket
);
module.exports = router;
