import React from 'react';

const Remaining = ({ remaining }) => {
  return (
    <div className='remainingBar'>
      <span className="remainingText">Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;
