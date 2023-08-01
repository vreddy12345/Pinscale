import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10; // Number of transactions to fetch per page

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch transactions for all users
  const fetchTransactions = useCallback(async () => {
    try {
      // Make API call to get all transactions with pagination
      const response = await axios.get('https://bursting-gelding-24.hasura.app/api/rest/all-transactions', {
        params: {
          page: currentPage,
          size: PAGE_SIZE,
        },
      });

      const transactionsData = response.data;
      setTransactions((prevTransactions) => [...prevTransactions, ...transactionsData]);

      // If the fetched data is less than the page size, it means no more transactions to load
      if (transactionsData.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  // Load more transactions when the user scrolls to the bottom of the page
  const handleScroll = () => {
    if (!hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // Fetch transactions for the initial page
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div>
      <h2>All Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>User Name: {transaction.userName}</p>
            <p>Transaction Name: {transaction.name}</p>
            <p>Category: {transaction.category}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
          </li>
        ))}
      </ul>
      {hasMore && <p>Loading more transactions...</p>}
      {!hasMore && <p>No more transactions to load.</p>}
    </div>
  );
};

export default AllTransactions;
