function ExpenseList({ expenses }) {
    return (
        <div className="card">
            <h2>Expense History</h2>

            {expenses.length === 0 ? (
                <p>No expenses added.</p>
            ) : (
                expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="expense-item"
                    >
                        <h3>{expense.description}</h3>

                        <p>
                            <strong>Amount:</strong> ₹{expense.amount}
                        </p>

                        <p>
                            <strong>Paid By:</strong> {expense.paidBy}
                        </p>

                        <p>
                            <strong>Participants:</strong>{" "}
                            {expense.participants.join(", ")}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default ExpenseList;