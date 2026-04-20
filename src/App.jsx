import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [
        { id: 1, text: 'Master React & Vite', completed: true },
        { id: 2, text: 'Build a premium UI Todo App', completed: false },
        { id: 3, text: 'Deploy the application', completed: false }
      ];
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Active', 'Completed'

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app-container">
      <div className="header">
        <h1>Task Master</h1>
        <p>Organize your day with elegance.</p>
      </div>

      <form className="input-container" onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </form>

      {todos.length > 0 && (
        <div className="filters">
          <button
            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'Active' ? 'active' : ''}`}
            onClick={() => setFilter('Active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`}
            onClick={() => setFilter('Completed')}
          >
            Completed
          </button>
        </div>
      )}

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
              <div className="checkbox">
                <svg className="checkmark" width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="todo-text">{todo.text}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete todo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                npm      <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </li>
        ))}

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              {filter === 'Completed' ? '🏆' : filter === 'Active' ? '🎯' : '✨'}
            </div>
            <p>
              {filter === 'Completed' ? 'No completed tasks yet.' :
                filter === 'Active' ? 'No active tasks! You are all caught up.' :
                  'Your task list is empty.'}
            </p>
          </div>
        )}
      </ul>

      {todos.length > 0 && (
        <div className="stats">
          <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
          {todos.some(todo => todo.completed) && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;