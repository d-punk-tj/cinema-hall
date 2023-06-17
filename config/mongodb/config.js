const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Database connection
if (process.env.DB_HOST != '') {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
    };

    const MONGOOSE_URL = process.env.DB_URI;
    console.log("🚀 ~ file: config.js:16 ~ MONGOOSE_URL", MONGOOSE_URL)
    const DB_HOST = process.env.DB_HOST;

    mongoose.connect(MONGOOSE_URL, options).catch((err) => {
        console.log('*** Can Not Connect to Mongo Server:', DB_HOST)
        console.log("mongo connect error",err);
    })

    let db = mongoose.connection;
    module.exports = db;    
    db.once('open',async () => {
        try {
            console.log("Mongodb \u2714");
            console.log('Connected to mongodb at ' + DB_HOST);             
        } catch (error) {
            console.log("error while connecting DB",error);
        }

    })
    db.on('error', (error) => {
        console.log("error", error);
    })
    
// End of Mongoose Setup
} else {
    console.log("No Mongo Credentials Given");
}
module.exports = mongoose;
