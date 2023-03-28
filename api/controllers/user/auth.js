const jwt = require("jsonwebtoken");
const { keys } = require("../../../config");
const {
  getUser,
  updateUser,
  createUser,
} = require("../../../database/queries/userQuery");
const { i18n } = require("../../../i18n");
const ResponseData = require("../../../util/ResponseData");
const otpGenerator = require("otp-generator");
const { transferMail } = require("../../../util/SystemUtils");
const {
  emailOtpVerificationTemplate,
} = require("../../../templates/emailOtpVerification");
const bcrypt = require("bcryptjs");

const otps = [];

const encryptPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, 10, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
const checkPassword = (password, hashPassword) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(
      password.toString(),
      hashPassword.toString(),
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};
const jwtsign = (payload) => {
  // Sign token
  return jwt.sign(payload, keys.secretOrKey, {
    expiresIn: 31556926, // 1 year in seconds
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser({ email });
    if (user != null) {
      if ((await checkPassword(password, user.password)) == true) {
        const token = jwtsign({
          id: user._id,
          fullName: user?.fullName,
          email: user?.email,
        });
        return ResponseData.ok(res, i18n(req.language, "success.200"), {
          user,
          token,
        });
      } else {
        return ResponseData.warning(
          res,
          i18n(req.language, "auth.wrong_password")
        );
      }
    } else {
      return ResponseData.warning(
        res,
        i18n(req.language, "auth.not_exist_user", email)
      );
    }
  } catch (err) {
    ResponseData.error(res, i18n(req.language, "error.db"), { err });
  }
};

const myAccount = async (req, res) => {
   
  try {
    const user = req.user;
   
    return ResponseData.ok(res, "", { user });
  } catch (err) {
    console.log(err);
    return ResponseData.error(res, i18n(req.language, "error.500"), { err });
  }
};
const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otps[email] && otps[email].otp == otp) {
      otps[email].emailVerification = true;
      const user = await createUser(otps[email]);
      if (user != null) {
        const response = {
          user,
          token: jwtsign({
            id: user._id,
            email,
            fullName: otps[email].fullName,
          }),
        };
        ResponseData.ok(res, i18n(req.language, "success.200"), response);
      } else {
        ResponseData.error(res, i18n(req.language, "error.db"));
      }
    } else {
      ResponseData.notfound(res, i18n(req.language, "error.otp"));
    }
  } catch (err) {
    console.log(err);
    ResponseData.error(res, i18n(req.language, "error.500"));
  }
};
const signUp = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const user = await getUser({ email, fullName });
    if (user != null) {
      return ResponseData.alreadyExist(
        res,
        i18n(req.language, "error.412", email)
      );
    } else {
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      console.log(otp);
      otps[email] = {
        email,
        fullName,
        password: await encryptPassword(password),
        otp,
      };

      const sentMail = await transferMail(
        email,
        "OTP verification for current email.",
        emailOtpVerificationTemplate(otp)
      );
      //   req.body.password = encryptPassword(req.body.password);
      //   await createUser(req.body);
      return sentMail
        ? ResponseData.ok(res, i18n(req.language, "success.200"))
        : ResponseData.error(res, i18n(req.language, "error.500"));
    }
  } catch (err) {
    console.log(err);
    return ResponseData.error(res, i18n(req.language, "error.500"));
  }
};

module.exports = {
  login,
  signUp,
  verifyEmailOtp,
  myAccount,
};
