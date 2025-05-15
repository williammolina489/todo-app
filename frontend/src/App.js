import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Fetch todos from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  const addTodo = async () => {
    if (input.trim() === '') return;
  
    try {
      const res = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
  
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setInput('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };
  

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter a todo" 
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
  {todos.map((todo) => (
    <li key={todo._id} className="todo-item">
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
        ❌
      </button>
    </li>
  ))}
</ul>


    </div>
  );
}

export default App;
