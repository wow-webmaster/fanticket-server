const express = require("express") ;

const router = express.Router();
const authenticate = require("../../middleware/authenticated");
const languageMiddleware = require("../../middleware/language");

const eventController = require("../controllers/event/event");
router.post('/add-event',languageMiddleware, authenticate, eventController.addEvent);

module.exports = router;
