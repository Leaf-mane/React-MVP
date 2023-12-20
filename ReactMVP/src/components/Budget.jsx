import React, { useState, useEffect } from 'react';

const Budget = ({ budget: initialBudget, setBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget || '');

  useEffect(() => {
    setNewBudget(initialBudget);
  }, [initialBudget]);

  const handleInputChange = (event) => {
    setNewBudget(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setBudget(newBudget);
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className='budgetBar'>
      {isEditing ? (
        <input
          type='number'
          value={newBudget}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <span className="budgetText" onClick={handleEditClick}>Budget: {newBudget || '[Click to add]'}</span>
      )}
    </div>
  );
};

export default Budget;
