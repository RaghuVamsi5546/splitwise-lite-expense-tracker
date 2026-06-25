// Calculates net balances and minimizes debt transactions.

const calculateSettlement = (expenses) => {
    const balances = {};

    // Calculate each person's balance
    expenses.forEach((expense) => {
        const { amount, paidBy, participants } = expense;

        const share = amount / participants.length;

        // Ensure payer exists
        if (!balances[paidBy]) {
            balances[paidBy] = 0;
        }

        // Payer paid the full amount
        balances[paidBy] += amount;

        participants.forEach((person) => {
            if (!balances[person]) {
                balances[person] = 0;
            }

            // Everyone owes their equal share
            balances[person] -= share;
        });
    });

    // Separate people who should receive and those who should pay
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([person, balance]) => {
        // Round to avoid floating-point precision issues
        const rounded = Number(balance.toFixed(2));

        if (rounded > 0) {
            creditors.push({
                person,
                amount: rounded
            });
        } else if (rounded < 0) {
            debtors.push({
                person,
                amount: Math.abs(rounded)
            });
        }
    });

    const settlements = [];

    let i = 0;
    let j = 0;

    // Greedy algorithm to minimize transactions
    while (i < debtors.length && j < creditors.length) {
        const payment = Math.min(
            debtors[i].amount,
            creditors[j].amount
        );

        settlements.push({
            from: debtors[i].person,
            to: creditors[j].person,
            amount: Number(payment.toFixed(2))
        });

        debtors[i].amount -= payment;
        creditors[j].amount -= payment;

        if (debtors[i].amount < 0.01) {
            i++;
        }

        if (creditors[j].amount < 0.01) {
            j++;
        }
    }

    return {
        balances,
        settlements
    };
};

module.exports = calculateSettlement;