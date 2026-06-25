import { useEffect, useState } from "react";
import "./App.css";

import api from "./services/api";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalancePanel from "./components/BalancePanel";
import SettlementPanel from "./components/SettlementPanel";

function App() {
    // Application state
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState({});
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch expenses from backend
    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch {
            alert("Unable to fetch expenses.");
        }
    };

    // Fetch balances and settlements
    const fetchSettlement = async () => {
        try {
            const response = await api.get("/expenses/settlement");

            setBalances(response.data.balances);
            setSettlements(response.data.settlements);
        } catch {
            alert("Unable to fetch settlements.");
        }
    };

    // Refresh all data
    const refreshData = async () => {
        setLoading(true);

        await fetchExpenses();
        await fetchSettlement();

        setLoading(false);
    };

    // Load data when app starts
    useEffect(() => {
        refreshData();
    }, []);

    if (loading) {
        return (
            <div className="app">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="app">
            <h1>Splitwise-Lite Expense Tracker</h1>

            <ExpenseForm onExpenseAdded={refreshData} />

            <ExpenseList expenses={expenses} />

            <BalancePanel balances={balances} />

            <SettlementPanel
              settlements={settlements}
              balances={balances}/>
        </div>
    );
}

export default App;