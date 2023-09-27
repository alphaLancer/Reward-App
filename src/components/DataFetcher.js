import React, { useEffect, useState } from "react";
import transactions from "../data";
import RewardCalculator from "./RewardCalculator";

const simulateApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000); // Simulate a 1-second delay
  });
};

const DataFetcher = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    simulateApiCall().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div>
      <h1>Reward Points App</h1>
      <RewardCalculator transactions={data} />
    </div>
  );
};

export default DataFetcher;
