//Code for sql

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD,
//     {
//         dialect: "mysql",
//         host: process.env.DB_HOST
//     }
// );

// module.exports = sequelize;


//Code for mongodb

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/expense_tracker');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function () {
    console.log("Connected to DB");
});