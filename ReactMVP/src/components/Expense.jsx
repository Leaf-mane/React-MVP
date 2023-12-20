import React, { useState } from 'react';

const Expense = ({ id, name: initialName, amount: initialAmount, description: initialDescription, category: initialCategory, deleteExpense, updateExpense }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [amount, setAmount] = useState(initialAmount);
  const [description, setDescription] = useState(initialDescription);
  const [category, setCategory] = useState(initialCategory);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  const handleUpdate = () => {
    const updatedData = {
      id,
      name,
      amount: parseFloat(amount),
      description,
      category,
    };
    updateExpense(updatedData);
    setIsEditing(false);
  };

  const itemClasses = `expenseItem ${expanded ? 'expanded' : ''}`;

  return (
    <div className={itemClasses} onClick={handleClick}>
      <div className="main-info" onClick={handleClick}>
        {isEditing ? (
          <>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </>
        ) : (
          <>
            <span>{name}:</span>
            <span>${amount}</span>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={toggleEdit}>Edit</button>
          </>
        )}
        {isEditing && <button onClick={handleUpdate}>Save</button>}
      </div>
      {expanded && (
        <div className="additional-info">
          Category: {category}<br />
          Description: {description}
        </div>
      )}
    </div>
  );
};

export default Expense;
