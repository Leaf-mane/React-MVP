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
  const [budget, setBudget] = useState(0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)
  const remainingBudget = budget - totalExpenses;

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  //Get (fetch expenses)
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
  }, [supabase]);

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
          <div className="logobar">
            <br></br>
            <span className="brand"><img className="logo" src="../img/b.png"/>udgey</span>
            <br></br>
          </div>
          <div className='topbar'>
            <Budget setBudget={setBudget}/>
            <Remaining budget={budget} expenses={expenses} remaining={remainingBudget}/>
            <Total budget={budget} expenses={expenses} totalExpenses={totalExpenses}/>
          </div>
          <div className="addBox">
            <Add addExpense={addExpense}/>
          </div>
          <div className="listContainer">
            <Expenses 
            expenseListItems={expenses} 
            deleteExpense={deleteExpense}
            updateExpense={updateExpense}
            />
          </div>
        </div>
      </div>
  )
}

export default App