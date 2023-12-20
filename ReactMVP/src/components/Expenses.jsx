import React from 'react';
import Expense from './Expense.jsx';

const Expenses = ({expenseListItems, deleteExpense,  updateExpense}) => {  

  if (!Array.isArray(expenseListItems)) {
    console.error('Expense list is not an array:', expenseListItems);
    return null;
  }

  return (
    <ul className="expenseList">
      {expenseListItems.map((expense) => (
        <li key={expense.id}>
            <Expense
            key={expense.id}
            id={expense.id}
            name={expense.name}
            amount={expense.amount}
            description={expense.description}
            category={expense.category}
            deleteExpense={deleteExpense}
            updateExpense={updateExpense}
            />
        </li>
      ))}
    </ul>
  );
};

export default Expenses;
