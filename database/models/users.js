const mongoose = require('mongoose');

// Create Schema
const UserShema = new mongoose.Schema({
    status:{
        type:String,
        default:'active'
    },
    emailVerification:{
        type:Boolean,
        default:false
    },
    email: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    fullname: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    cfp: {
        type: String,
        default: "",
    },
    cnpj: {
        type: String,
        default: "",
    },
    businessRole: {
        type: String,
        default: "personal",
    },
    siteRole: {
        type: String,
        default: "client",
    },
    companyId: {
        type: String,
    },
    regDate: {
        type: String,
        default: "",
    },
    tokens: {
        type: Array,
        default: [
            { tokenId: '', amount: 0, lastUpdated: '', created: '', }
        ]
    }
});
module.exports = mongoose.model("user", UserShema);
