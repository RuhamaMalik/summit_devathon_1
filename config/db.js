const mongoose = require('mongoose');

const conenectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connect to Mongo DB database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongo Db ${error}`);
    }
};


module.exports = conenectDB;