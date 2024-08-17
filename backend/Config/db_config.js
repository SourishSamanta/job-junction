const mongoose = require('mongoose');

async function ConnnectToDB(url) {
    try {
        console.log("Connecting to MongoDB atlas ...");
        await mongoose.connect(url);
        console.log("Connected successfully !!!");
    }
    catch (error) {
        console.log(error)
        throw (error)
    }
}

module.exports = ConnnectToDB;