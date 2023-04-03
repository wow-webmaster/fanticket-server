const multer = require("multer");

const path = require("path");

const avatarStorage = multer.diskStorage({
    // Destination to store image
    destination: "./uploads/avatar",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            "-c" +
            Date.now() +
            path.extname(file.originalname)
        );
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});
const ticketAvatarStorage = multer.diskStorage({
    // Destination to store image
    destination: "./uploads/ticket_avatar",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            "-c" +
            Date.now() +
            path.extname(file.originalname)
        );
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});
const eventStorage = multer.diskStorage({
    // Destination to store image
    destination: "./uploads/events",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            "-c" +
            Date.now() +
            path.extname(file.originalname)
        );
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});

const ticketStorage = multer.diskStorage({
    // Destination to store image
    destination: "./uploads/ticket",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            "-c" +
            Date.now() +
            path.extname(file.originalname)
        );
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});


var avatarUploader = multer({
    storage: avatarStorage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp|webp)$/)) {
            // upload only png and jpg format

            return cb(new Error("Please upload a Image"));
        }
        cb(null, true);
    },

});
var eventUploader = multer({
    storage: eventStorage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp|webp)$/)) {
            // upload only png and jpg format

            return cb(new Error("Please upload a Image"));
        }
        cb(null, true);
    },

});
var ticketUploader = multer({
    storage: ticketStorage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp|webp|pdf|pkpass)$/)) {
            // upload pdf | pkpassfile

            return cb(new Error("Please upload a pdf or pkpass file"));
        }
        cb(null, true);
    },

});

var ticketAvatarUploader = multer({
    storage: ticketAvatarStorage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp|webp|pdf|pkpass)$/)) {
            // upload pdf | pkpassfile

            return cb(new Error("Please upload a pdf or pkpass file"));
        }
        cb(null, true);
    },

});

// --------------------------------------

module.exports = {
    avatarUploader,
    eventUploader,
    ticketUploader,
    ticketAvatarUploader
};