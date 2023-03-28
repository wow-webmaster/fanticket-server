const express = require("express") ;

const router = express.Router();
const authenticate = require("../../middleware/authenticated");
const languageMiddleware = require("../../middleware/language");
const authController = require('../controllers/user/auth');

router.get("/my-account",languageMiddleware, authenticate, authController.myAccount);
router.post("/login",languageMiddleware, authController.login);
router.post("/signup",languageMiddleware, authController.signUp);
router.post('/verify-email-otp',languageMiddleware, authController.verifyEmailOtp);

module.exports = router;
