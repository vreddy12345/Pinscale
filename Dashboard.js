import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Dashboard = ({ user }) => {
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Make API calls to get dashboard data based on user role
        let totalCreditEndpoint;
        let totalDebitEndpoint;
        let recentTransactionsEndpoint;
        let chartDataEndpoint;

        if (user.isAdmin) {
          // Admin User Dashboard APIs
          totalCreditEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin/credit';
          totalDebitEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin/debit';
          recentTransactionsEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?page=1&size=3';
          chartDataEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin';
        } else {
          // Non-Admin User Dashboard APIs
          totalCreditEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals/credit';
          totalDebitEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals/debit';
          recentTransactionsEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?page=1&size=3';
          chartDataEndpoint = 'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days';
        }

        // Fetch total credit and total debit amounts
        const totalCreditResponse = await axios.get(totalCreditEndpoint);
        setTotalCredit(totalCreditResponse.data.totalCredit);

        const totalDebitResponse = await axios.get(totalDebitEndpoint);
        setTotalDebit(totalDebitResponse.data.totalDebit);

        // Fetch recent transactions
        const recentTransactionsResponse = await axios.get(recentTransactionsEndpoint);
        setRecentTransactions(recentTransactionsResponse.data);

        // Fetch chart data
        const chartDataResponse = await axios.get(chartDataEndpoint);
        setChartData(chartDataResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, [user.isAdmin]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user.isAdmin ? (
        // Display totalCredit and totalDebit for Admin User
        <div>
          <p>Total Credit: {totalCredit}</p>
          <p>Total Debit: {totalDebit}</p>
        </div>
      ) : (
        // Display totalCredit and totalDebit for Non-Admin User
        <div>
          <p>Your Total Credit: {totalCredit}</p>
          <p>Your Total Debit: {totalDebit}</p>
        </div>
      )}

      {/* Display recent transactions */}
      <h3>Recent Transactions</h3>
      <ul>
        {recentTransactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Transaction Name: {transaction.name}</p>
            <p>Category: {transaction.category}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
          </li>
        ))}
      </ul>

      {/* Display Bar Chart */}
      <h3>Bar Chart - Daily Total Credit and Debit (Last 7 Days)</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
