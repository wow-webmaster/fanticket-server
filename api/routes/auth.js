const express = require("express") ;

const router = express.Router();
const authenticate = require("../../middleware/authenticated");
const authController = require('../controllers/user/auth');

router.post("/login", authController.login);

module.exports = router;
