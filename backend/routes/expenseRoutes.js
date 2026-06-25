const express = require("express");

const {
    addExpense,
    getExpenses,
    getSettlement
} = require("../controllers/expenseController");

const router = express.Router();

// Create a new expense
router.post("/", addExpense);

// Get all expenses
router.get("/", getExpenses);

router.get("/settlement", getSettlement);

module.exports = router;