import React from "react";
import "../style/RewardCalculator.css"; // Add CSS file for styling

const calculateRewardPoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2; // 2 points for every dollar over $100
    points += 50; // 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    points += amount - 50; // 1 point for every dollar between $50 and $100
  }

  return points;
};

const RewardCalculator = ({ transactions }) => {
  const monthlyRewards = {};

  transactions.forEach((transaction) => {
    const { customerId, month, amount } = transaction;
    const points = calculateRewardPoints(amount);

    if (!monthlyRewards[customerId]) {
      monthlyRewards[customerId] = {};
    }

    if (!monthlyRewards[customerId][month]) {
      monthlyRewards[customerId][month] = 0;
    }

    monthlyRewards[customerId][month] += points;
  });

  // Render the results as a styled table
  return (
    <div className="reward-calculator">
      <h2>Reward Points Calculator</h2>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Month</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(monthlyRewards).map((customerId) => {
            return Object.keys(monthlyRewards[customerId]).map(
              (month, index) => {
                return (
                  <tr key={`${customerId}-${month}`}>
                    {index === 0 && (
                      <td
                        rowSpan={Object.keys(monthlyRewards[customerId]).length}
                      >
                        {customerId}
                      </td>
                    )}
                    <td>{month}</td>
                    <td>{monthlyRewards[customerId][month]}</td>
                  </tr>
                );
              }
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RewardCalculator;
