//sql code 

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const ResetPassword = sequelize.define("ResetPassword", {
//     id: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false,
//     },
//     isActive: Sequelize.BOOLEAN,
// });

// module.exports = ResetPassword;


//mongo db code

const mongoose = require("mongoose");

const resetPasswordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

module.exports = ResetPassword;