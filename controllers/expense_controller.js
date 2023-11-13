const Expense = require("../models/expense");
const User = require("../models/user");
// const sequelize = require("../util/database");
const mongoose = require("mongoose");

// module.exports.addExpense = async (req, res) => {
//     const t = await sequelize.transaction();
//     try {
//         const date = req.body.date;
//         const category = req.body.category;
//         const description = req.body.description;
//         const amount = req.body.amount;

//         await User.update({ totalExpenses: req.user.totalExpenses + Number(amount) },
//             { where: { id: req.user.id } }, { transaction: t }
//         );

//         await Expense.create({
//             date: date,
//             category: category,
//             description: description,
//             amount: amount,
//             userId: req.user.id
//         }, { transaction: t }
//         ).then((data) => {
//             res.status(200).redirect("/user_dashboard"); // Pending -: Doubt why use .redirect here, bcz when we give home route ('/) its not work
//         }).catch((err) => {
//             console.log(err);
//         });
//         await t.commit();
//     } catch {
//         async (err) => {
//             await t.rollback();
//             console.log(err);
//         };
//     }
// };

// //its a normal controller for sending the data to frontend
// exports.getAllExpenses = async (req, res) => {
//     try {
//         const expenses = await Expense.findAll({ where: { userId: req.user.id } });
//         res.json(expenses); // send the date where api call (This is is API or controller for get expense data)
//     } catch (err) {
//         console.log(err);
//     }
// };

// //this controller work with pagenation
// exports.getAllExpensesforPagination = async (req, res) => {
//     try {
//         const pageNo = req.params.page;
//         const limit = 7; //how many to take
//         const offset = (pageNo - 1) * limit; //how many records to skip from starting
//         const totalExpenses = await Expense.count({ where: { userId: req.user.id } });
//         const totalPages = Math.ceil(totalExpenses / limit);

//         const expenses = await Expense.findAll({
//             where: { userId: req.user.id },
//             offset: offset, //how many records to skip from starting
//             limit: limit //how many to take
//         });
//         res.json({ expenses: expenses, totalPages: totalPages });
//     } catch (err) {
//         console.log(err);
//     }
// };

// exports.deleteExpense = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const expense = await Expense.findByPk(id);
//         await User.update(
//             {
//                 totalExpenses: req.user.totalExpenses - expense.amount,
//             }, { where: { id: req.user.id } }
//         );
//         await Expense.destroy({ where: { id: id } });
//         res.redirect("/user_dashboard");
//     } catch (err) {
//         console.log(err);
//     }
// };

// exports.updateExpense = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const category = req.body.category;
//         const description = req.body.description;
//         const amount = req.body.amount;

//         const expense = await Expense.findByPk(id);

//         await User.update(
//             {
//                 totalExpenses: req.user.totalExpenses - expense.amount + Number(amount),
//             },
//             { where: { id: req.user.id } }
//         );

//         await Expense.update({
//             category: category,
//             description: description,
//             amount: amount
//         }, { where: { id: id } }
//         );
//         res.redirect("/user_dashboard");
//     } catch (err) {
//         console.log(err);
//     }
// };

exports.addExpense = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const date = req.body.date;
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;

        const user = await User.findById(req.user.id);
        user.totalExpenses += Number(amount);
        await user.save({ session });

        const expense = new Expense({
            date: date,
            category: category,
            description: description,
            amount: amount,
            userId: req.user.id,
        });

        await expense.save({ session });
        await session.commitTransaction();
        res.status(200).redirect("/homePage");
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
    } finally {
        session.endSession();
    }
};

exports.getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (err) {
        console.log(err);
    }
};

exports.getAllExpensesforPagination = async (req, res, next) => {
    try {
        const pageNo = req.params.page;
        const limit = 10;
        const offset = (pageNo - 1) * limit;
        const totalExpenses = await Expense.countDocuments({ userId: req.user.id });
        const totalPages = Math.ceil(totalExpenses / limit);
        const expenses = await Expense.find({ userId: req.user.id })
            .skip(offset)
            .limit(limit);
        res.json({ expenses: expenses, totalPages: totalPages });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findOne({ _id: id, userId: req.user.id });
        const user = await User.findById(req.user.id);
        user.totalExpenses -= expense.amount;
        await user.save();
        await Expense.deleteOne({ _id: id, userId: req.user.id });
        res.redirect("/homePage");
    } catch (err) {
        console.log(err);
    }
};

exports.editExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;

        const expense = await Expense.findOne({ _id: id, userId: req.user.id });
        const user = await User.findById(req.user.id);

        user.totalExpenses = user.totalExpenses - expense.amount + Number(amount);
        await user.save();

        await Expense.updateOne(
            { _id: id, userId: req.user.id },
            {
                category: category,
                description: description,
                amount: amount,
            }
        );
        res.redirect("/homePage");
    } catch (err) {
        console.log(err);
    }
};