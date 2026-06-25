function BalancePanel({ balances }) {
    const people = Object.keys(balances);

    return (
        <div className="card">
            <h2>Net Balances</h2>

            {people.length === 0 ? (
                <p>No balances available.</p>
            ) : (
                <ul>
                    {people.map((person) => (
                        <li key={person}>
                            <strong>{person}</strong>

                            {" : "}₹{balances[person].toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BalancePanel;