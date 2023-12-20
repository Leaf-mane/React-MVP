import React, { useState } from 'react';
import { useSupabase } from '../SupabaseContext.jsx';

const Add = ({ addExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const supabase = useSupabase();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
   
      const { data, error } = await supabase
      .from('expense')
      .insert([
        {
          name,
          amount: parseFloat(amount),
          description,
          category,
        },
      ])
      .select('*');
      
      console.log(data)
      if (error) {
        throw error;
      }

      if (data) {
        addExpense(data[0]);
        setName('');
        setAmount('');
        setCategory('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className='add'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='nameEntry'>
            <label>Name: </label>
            <br></br>
            <input
              required
              type='text'
              className='form-entry'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='costEntry'>
            <label>Cost: </label>
            <br></br>
            <input
              required
              type='number'
              className='form-entry'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='catEntry'>
            <label>Category: </label>
            <br></br>
            <input
              required
              type='text'
              className='form-entry'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className='descEntry'>
            <label>Description: </label>
            <br></br>
            <input
              required
              type='text'
              className='form-entry'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className='buttonBox'>
          <button type='submit' className='submitButton'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
