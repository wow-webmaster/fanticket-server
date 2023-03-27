const jwt = require("jsonwebtoken");
const { keys } = require("../../../config");
const { getUser, updateUser } = require('../../../database/queries/userQuery');
const { i18n } = require('../../../i18n');

const encryptPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(password, 10, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
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
    return jwt.sign(
        payload,
        keys.secretOrKey, {
            expiresIn: 31556926 // 1 year in seconds
        }
    );
}


const login = async (req, res) => {

}

const signUp = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const user = await getUser({ email, phone });
        if (user != null) {
            return res.status(412).json({ success: false, message: i18n(req.language, 'error.err412') });
        }
        else {
            req.body.password = encryptPassword(req.body.password);
       
            await createUser(req.body);
        }
    }
    catch (err) {

    }
}

module.exports = {
    login,
}