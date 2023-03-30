const express = require("express") ;

const router = express.Router();
const authenticate = require("../../middleware/authenticated");
const languageMiddleware = require("../../middleware/language");

const eventController = require("../controllers/events/event");
router.post('/add-event',languageMiddleware, authenticate, eventController.addEvent);
router.get('/get-available-events',languageMiddleware,eventController.getAllEvents);
router.post('/add-new-type', languageMiddleware,authenticate, eventController.addNewEventType);
module.exports = router;
