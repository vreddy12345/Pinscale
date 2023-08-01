import React from 'react';
import axios from 'axios';

const DeleteTransaction = ({ transaction, onTransactionDeleted }) => {
  const handleDeleteTransaction = async () => {
    try {
      // Make API call to delete transaction
      await axios.delete(
        `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction/${transaction.id}`
      );

      // Update the state to remove the deleted transaction
      onTransactionDeleted();
      // Show success toast message
      alert('Transaction deleted successfully!');
    } catch (error) {
      console.error(error);
      // Show error toast message
      alert('Failed to delete transaction.');
    }
  };

  return (
    <div>
      <h2>Delete Transaction</h2>
      <p>Are you sure you want to delete this transaction?</p>
      <button type="button" onClick={handleDeleteTransaction}>
        Delete Transaction
      </button>
    </div>
  );
};

export default DeleteTransaction;
