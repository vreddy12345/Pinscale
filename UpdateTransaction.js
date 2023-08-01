import React, { useState } from 'react';
import axios from 'axios';

const UpdateTransaction = ({ transaction, onTransactionUpdated }) => {
  const [updatedTransactionData, setUpdatedTransactionData] = useState({
    name: transaction.name,
    type: transaction.type,
    category: transaction.category,
    amount: transaction.amount,
    date: transaction.date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTransactionData({ ...updatedTransactionData, [name]: value });
  };

  const handleUpdateTransaction = async () => {
    try {
      // Validate input fields before making the API call
      if (!updatedTransactionData.name || !updatedTransactionData.amount || !updatedTransactionData.date) {
        alert('Transaction name, amount, and date are required.');
        return;
      }

      if (updatedTransactionData.name.length > 30) {
        alert('Transaction name should have a maximum of 30 characters.');
        return;
      }

      if (isNaN(updatedTransactionData.amount) || updatedTransactionData.amount <= 0) {
        alert('Amount should be a numeric value greater than zero.');
        return;
      }

      // Make API call to update transaction
      await axios.post('https://bursting-gelding-24.hasura.app/api/rest/update-transaction', {
        ...updatedTransactionData,
        transactionId: transaction.id,
      });

      // Update the state with the newly updated transaction
      onTransactionUpdated();
      // Show success toast message
      alert('Transaction updated successfully!');
    } catch (error) {
      console.error(error);
      // Show error toast message
      alert('Failed to update transaction.');
    }
  };

  return (
    <div>
      <h2>Update Transaction</h2>
      <form>
        <input
          type="text"
          name="name"
          value={updatedTransactionData.name}
          onChange={handleChange}
        />
        <select name="type" value={updatedTransactionData.type} onChange={handleChange}>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <select name="category" value={updatedTransactionData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          {/* Add more options as needed */}
        </select>
        <input
          type="number"
          name="amount"
          value={updatedTransactionData.amount}
          onChange={handleChange}
        />
        <input type="date" name="date" value={updatedTransactionData.date} onChange={handleChange} />
        <button type="button" onClick={handleUpdateTransaction}>
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
