const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Parse incoming JSON
app.use(express.json());

// Allow frontend requests
app.use(cors());

// Health check route
app.get("/", (req, res) => {
    res.json({
        message: "Splitwise-Lite Backend is Running"
    });
});

// Expense routes
app.use("/expenses", expenseRoutes);

module.exports = app;