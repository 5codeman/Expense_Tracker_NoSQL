//sql code

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Premium = sequelize.define("premiums", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING,
// });

// module.exports = Premium;


//mysql code
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Premium = mongoose.model("Premium", OrderSchema);

module.exports = Premium;