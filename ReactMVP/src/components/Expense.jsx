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

  const handleClick = (e) => {
    if(!e.target.matches('input')){
        setExpanded(!expanded);
    }
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

  const itemClasses = `expenseItem ${expanded ? 'expanded' : 'closed'}`;

  return (
    <div className={itemClasses} onClick={handleClick}>
      <div className="main-info" onClick={handleClick}>
        {isEditing ? (
          <>
            <input
                type="text"
                value={name}
                onChange={(e) => {
                setName(e.target.value);
                e.stopPropagation(); 
                }}
                />
            <input
                type="number"
                value={amount}
                onChange={(e) => {
                setAmount(e.target.value);
                e.stopPropagation(); 
                }}
            />
            <input
                type="text"
                value={category}
                onChange={(e) => {
                setCategory(e.target.value);
                e.stopPropagation(); 
                }}
            />
            <input
                type="text"
                value={description}
                onChange={(e) => {
                setDescription(e.target.value);
                e.stopPropagation(); 
                }}
            />
          </>
        ) : (
          <>
            <div className="names">
                <span className="itemName">{name}:</span>
                <span className="costName">-${amount}</span>
            </div>
            <div className="buttons">
                <button className="editButton" onClick={toggleEdit}></button>
                <button className="deleteButton" onClick={handleDelete}></button>
            </div>
          </>
        )}
        {isEditing && <button className="saveButton"onClick={handleUpdate}>Save</button>}
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
