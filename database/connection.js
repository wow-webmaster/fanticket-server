const mongoose = require('mongoose');
const { getConfig } = require('../config');

const getSession =  async () => {
    if (mongoose.connection.readyState) {
        console.log("new start session");
        return await mongoose.connection.startSession();

    }
    else {
        return null;
    }
}


const databaseInit = async()=> {
    /**
     * If the connection is already established,
     * returns the mongoose instance.
     */
    if (mongoose.connection.readyState) {
        return mongoose;
    }

    /**
     * Connects to MongoDB
     */
    return mongoose
        .connect(getConfig().MONGODB_URI, {
            dbName: getConfig().MONGODB_DATABASE,
        })
        .then(() => {
            console.log('connected mongodb');
        })
        .catch((error) => {
            console.error(error);

            throw error;
        });
}

module.exports = {
    databaseInit,
    getSession,
}