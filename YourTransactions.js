import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const YourTransactions = ({ user }) => {
  const [yourTransactions, setYourTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreTransactions = async () => {
    try {
      const response = await axios.get(
        `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?userId=${user.id}&page=${pageNumber}`
      );
      const transactionsData = response.data;

      if (transactionsData.length === 0) {
        // No more transactions to load
        setHasMore(false);
        return;
      }

      // Append new transactions to the existing list
      setYourTransactions((prevTransactions) => [...prevTransactions, ...transactionsData]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch initial transactions when the component mounts
    loadMoreTransactions();
  }, [user]);

  return (
    <div>
      <h2>Your Transactions</h2>
      <ul>
        {yourTransactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Transaction Name: {transaction.name}</p>
            <p>Category: {transaction.category}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <Link to={`/update-transaction/${transaction.id}`}>Update</Link>{' '}
            <Link to={`/delete-transaction/${transaction.id}`}>Delete</Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button type="button" onClick={loadMoreTransactions}>
          Load More
        </button>
      )}
    </div>
  );
};

export default YourTransactions;
