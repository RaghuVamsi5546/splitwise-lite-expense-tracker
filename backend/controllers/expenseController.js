const calculateSettlement = require("../services/settlementService");
const expenses = require("../data/expenses");

// Add a new expense
const addExpense = (req, res) => {
    const { description, amount, paidBy, participants } = req.body;

    // Validate required fields
    if (
        !description ||
        !amount ||
        !paidBy ||
        !participants ||
        !Array.isArray(participants)
    ) {
        return res.status(400).json({
            message: "Invalid request data."
        });
    }

    // Amount must be greater than zero
    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0."
        });
    }

    // At least one participant is required
    if (participants.length === 0) {
        return res.status(400).json({
            message: "Select at least one participant."
        });
    }

    // Create an expense object
    const expense = {
        id: expenses.length + 1,
        description,
        amount: Number(amount),
        paidBy,
        participants
    };

    // Store the expense
    expenses.push(expense);

    return res.status(201).json({
        message: "Expense added successfully.",
        expense
    });
};

// Return all stored expenses
const getExpenses = (req, res) => {
    return res.json(expenses);
};


// Calculate balances and settlements
const getSettlement = (req, res) => {
    const result = calculateSettlement(expenses);

    return res.json(result);
};

module.exports = {
    addExpense,
    getExpenses,
    getSettlement
};