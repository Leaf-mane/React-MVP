import { useState, useEffect } from 'react'
import Total from './components/total.jsx'
import Budget from './components/Budget.jsx'
import Remaining from './components/Remaining.jsx'
import Add from './components/Add.jsx'
import Expenses from './components/Expenses.jsx'
import Expense from './components/Expense.jsx'
import './App.css'
import { useSupabase } from './SupabaseContext.jsx';


function App() {
  const supabase = useSupabase();
  const [expenses, setExpenses] = useState([]);
  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };
  //Get
  useEffect(() => {
    async function fetchExpenses() {
      try {
        let { data: expensesData, error } = await supabase
          .from('expense')
          .select('*');
          
        if (error) {
          throw error;
        }

        setExpenses(expensesData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    }
    
    fetchExpenses();
  }, []);
  //Delete
  const deleteExpense = async (id) => {
    try {
      const { error } = await supabase.from('expense').delete().eq('id', id);
      if (error) {
        throw error;
      }
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  //Update
  const updateExpense = async (updatedData) => {
    try {
      const { error } = await supabase
        .from('expense')
        .update(updatedData)
        .eq('id', updatedData.id);
      
      if (error) {
        throw error;
      }
  
      const updatedExpenses = expenses.map(expense => {
        if (expense.id === updatedData.id) {
          return updatedData;
        }
        return expense;
      });
  
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };
  return (
      <div className='body'>
        <div className='container'>
          <div className='topbar'>
            <Budget />
            <Remaining />
            <Total />
          </div>
          <br></br>
          <Add addExpense={addExpense}/>
          <br></br>
          <div className="listContainer">
            <Expenses expenseListItems={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense}/>
          </div>
        </div>
      </div>
  )
}

export default App