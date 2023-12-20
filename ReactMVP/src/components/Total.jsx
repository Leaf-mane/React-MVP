import React from 'react';

const Total = ({ totalExpenses }) => {
  return (
    <div className='totalBar'>
      <span className="totalText">Total Expenses: ${totalExpenses}</span>
    </div>
  );
};

export default Total;
