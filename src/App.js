import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Tasks } from './components/Tasks';
import { AddTaskForm } from './components/AddTaskForm';

function App() {

  const [ tasks, setState ] = useState([ ]);
  const [ isShowedAddTaskForm, setShowingAddTaskForm ] = useState(false);

  const onDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setState( tasks.filter(task => task.id !== id) );
    }
  }

  const onToggleReminder = async (id) => {
    const found = tasks.find(task => task.id === id);
    found.reminder = !found.reminder;
    
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(found)
    });

    const data = await response.json();
    setState( tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task) );
  }

  const addTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    setState([ ...tasks, data ]);
  }

  const showAddTaskForm = () => setShowingAddTaskForm(!isShowedAddTaskForm);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    return await response.json();
  }

  useEffect(() => {
    const getTasks = async() => {
      const tasks = await fetchTasks();
      setState(tasks);
    }

    getTasks();
  }, [])

  return (
    <Router>
      <div className='container'>
        <Header onClickOnAddButton={ showAddTaskForm } isShowedAddTaskForm={ isShowedAddTaskForm }/>
        <Routes>
          <Route path="/" element={
            <>
              { isShowedAddTaskForm && (<AddTaskForm onAddTask={ addTask } />) }
              { 
                tasks.length ? 
                  (<Tasks tasks={ tasks } onDelete={ onDelete } onToggle={ onToggleReminder } />) : 
                  (<p>You don't have tasks</p>) 
              }
            </>
          } />
          <Route path="/about" element={ <About /> } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
