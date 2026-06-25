import { useState } from "react";
import api from "../services/api";
function ExpenseForm({ onExpenseAdded }) {
    // Fixed list of people for this project
    const people = ["Rahul", "Sneha", "Amit"];

    // Form state
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [participants, setParticipants] = useState([]);

    // Add or remove a participant
    const handleParticipantChange = (person) => {
        if (participants.includes(person)) {
            setParticipants(participants.filter((p) => p !== person));
        } else {
            setParticipants([...participants, person]);
        }
    };

    // Validate and submit the form
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!description.trim()) {
            alert("Please enter a description.");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            alert("Enter a valid amount.");
            return;
        }

        if (!paidBy) {
            alert("Select who paid.");
            return;
        }

        if (participants.length === 0) {
            alert("Select at least one participant.");
            return;
        }

        const expense = {
            description,
            amount: Number(amount),
            paidBy,
            participants
        };

        // Will be replaced with an API call later
        try {
        // Send expense to backend
        await api.post("/expenses", expense);

        // Refresh application data
        onExpenseAdded();

        alert("Expense added successfully!");
    } catch (error) {
        alert("Failed to add expense.");
        return;
    }

        // Reset the form
        setDescription("");
        setAmount("");
        setPaidBy("");
        setParticipants([]);
    };

    return (
        <div className="card">
            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit}>

                <label>Description</label>
                <input
                    type="text"
                    placeholder="Enter expense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Amount</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <label>Paid By</label>
                <select
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                >
                    <option value="">Select Person</option>

                    {people.map((person) => (
                        <option key={person} value={person}>
                            {person}
                        </option>
                    ))}
                </select>

                <label>Participants</label>

                <div className="participants">
                    {people.map((person) => (
                        <label key={person}>
                            <input
                                type="checkbox"
                                checked={participants.includes(person)}
                                onChange={() =>
                                    handleParticipantChange(person)
                                }
                            />

                            {person}
                        </label>
                    ))}
                </div>

                <button type="submit">
                    Add Expense
                </button>

            </form>
        </div>
    );
}

export default ExpenseForm;