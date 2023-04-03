// const { getSession } = require("../connection")
const UserModel = require("../models/users");
const TicketModel = require("../models/ticket");
const { default: mongoose } = require("mongoose");

const createUser = async (data) => {
  try {
    const user = await UserModel.create(data);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getUser = async ({ fullName = "", email = "" }) => {
  try {
    const user = await UserModel.findOne({ $or: [{ email }, { fullName }] });
    return user;
  } catch (err) {
    return null;
  }
};
const updateUser = async (id, data) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return user;
  } catch (err) {
    return null;
  }
};

const getTicketOwnerInformation = async ({ uploader }) => {
  try {
    const user = await UserModel.aggregate([
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "uploader",
          as: "tickets",
        },
      },
      {
        $match: {
          _id: mongoose.Types.ObjectId(uploader),
        },
      },
    ]);
    if (user && user.length > 0) return user[0];
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
module.exports = {
  createUser,
  updateUser,
  getUser,
  getTicketOwnerInformation
};
