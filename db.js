import mongoose from 'mongoose';
// import and config the dot env module
import { configDotenv } from 'dotenv';
configDotenv();
const mongoURL = process.env.mongoDB;    // cloud based url
// const mongoURL = process.env.mongolocal;  // to run locally
mongoose.connect(mongoURL);
const db = mongoose.connection;
// database event listerner
db.on('connected', () => {
    console.log(`connected to server`);
});

db.on('error', (err) => {
    console.error('error to server:', err);
});

db.on('disconnected', () => {
    console.log(`server disconnected`);
});
// named Export the db
export { db };

