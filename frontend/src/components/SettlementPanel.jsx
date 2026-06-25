function SettlementPanel({ settlements, balances }) {
    if (Object.keys(balances).length === 0) {
        return (
            <div className="card">
                <h2>Settlements</h2>
                <p>No data available.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2>Settlements</h2>

            <ul>
                {Object.entries(balances).map(([person, balance]) => {
                    if (Math.abs(balance) < 0.01) {
                        return (
                            <li key={person}>
                                <strong>{person}</strong> owes nobody (Even)
                            </li>
                        );
                    }

                    return null;
                })}

                {settlements.map((item, index) => (
                    <li key={index}>
                        <strong>{item.from}</strong> owes{" "}
                        <strong>{item.to}</strong>{" "}
                        ₹{item.amount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SettlementPanel;