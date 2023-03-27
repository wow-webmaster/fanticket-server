// const { getSession } = require("../connection")
const UserModel = require('../models/users');

const createUser = async (data) => {
    try{
        const user = await UserModel.create(data);
        return user;
    }
    catch(err){
        return null;
    }
    
}

const getUser = async({phone = '', email = ''})=>{
    try{
        const user = await UserModel.findOne({$or:[{phone},{email}]});
        return user;
    }
    catch(err){
        return null;
    }
}
const updateUser = async(id, data)=>{
    try{
        const user = await UserModel.findByIdAndUpdate(id, data, {new:true});
        return user;
    }
    catch(err){
        return null;
    }
}
module.exports = {
    createUser,
    updateUser,
    getUser,
}