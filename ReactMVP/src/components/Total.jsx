import React from 'react';

const Total = ({ totalExpenses }) => {
  return (
    <div className='totalBar'>
      <span>Total Expenses: ${totalExpenses}</span>
    </div>
  );
};

export default Total;
