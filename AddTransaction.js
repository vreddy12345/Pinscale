import React, { useState } from 'react';
import axios from 'axios';

const AddTransaction = ({ user, onTransactionAdded }) => {
  const [transactionData, setTransactionData] = useState({
    name: '',
    type: 'Credit',
    category: '',
    amount: '',
    date: '',
  });

  const [showPopup, setShowPopup] = useState(false); // To show the pop-up

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleAddTransaction = async () => {
    try {
      // Validations
      if (!transactionData.name || !transactionData.category || !transactionData.amount || !transactionData.date) {
        alert('Please fill in all the fields.');
        return;
      }

      if (transactionData.name.length > 30) {
        alert('Transaction name should not exceed 30 characters.');
        return;
      }

      if (isNaN(transactionData.amount) || parseFloat(transactionData.amount) <= 0) {
        alert('Amount should be a numeric value greater than zero.');
        return;
      }

      // Make API call to add transaction
      await axios.post('https://bursting-gelding-24.hasura.app/api/rest/add-transaction', {
        ...transactionData,
        userId: user.id,
      });

      // Update the state with the newly added transaction
      onTransactionAdded();

      // Show the pop-up for successful transaction addition
      setShowPopup(true);

      // Clear the transaction data in the state
      setTransactionData({
        name: '',
        type: 'Credit',
        category: '',
        amount: '',
        date: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add transaction.');
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form>
        {/* Input fields */}
        <input
          type="text"
          name="name"
          placeholder="Transaction Name"
          value={transactionData.name}
          onChange={handleChange}
        />
        <select name="type" value={transactionData.type} onChange={handleChange}>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <select name="category" value={transactionData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          {/* Add more options as needed */}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transactionData.amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={transactionData.date}
          onChange={handleChange}
        />

        {/* Add Transaction Button */}
        <button type="button" onClick={handleAddTransaction}>
          Add Transaction
        </button>
      </form>

      {/* Pop-up for successful transaction addition */}
      {showPopup && (
        <div>
          <h3>Success!</h3>
          <p>Transaction added successfully.</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
