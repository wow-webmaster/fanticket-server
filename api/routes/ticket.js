const express = require("express");

const router = express.Router();
const authenticate = require("../../middleware/authenticated");
const languageMiddleware = require("../../middleware/language");
const {
  ticketUploader,
  ticketAvatarUploader,
} = require("../../util/FileUploader");
const {
  reqStringValidator,
  reqNumberValidator,
} = require("../../util/Validation");
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
router.post(
  "/upload-avatar",
  languageMiddleware,
  authenticate,
  ticketAvatarUploader.single("file"),
  ticketController.uploadTicketAvatar
);
router.post(
  "/save-note",
  languageMiddleware,
  authenticate,
  ticketController.saveTicketNote
);
router.post(
  "/save-price",
  languageMiddleware,
  authenticate,
  [
    reqStringValidator("seat"),
    reqStringValidator("qrcode"),
    reqNumberValidator("sellPrice"),
  ],
  ticketController.saveTicketPrice
);

router.post(
  "/reset",
  languageMiddleware,
  authenticate,
  ticketController.resetTicket
);

router.get("/detail/:ticketId", languageMiddleware, authenticate, ticketController.getTicketDetail);
router.post("/finalize", languageMiddleware, authenticate, ticketController.finializeTicket);

module.exports = router;
