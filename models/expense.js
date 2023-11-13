//Sql code

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Expenses = sequelize.define("expenses", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     date: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     category: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     amount: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
// });

// module.exports = Expenses;


//mongo db code
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;