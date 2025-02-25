import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import logo from './logo.svg';
import './App.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [input, setInput] = useState("");

    const addTodo = () => {
      if (input.trim()) {
        setTodos([...todos, { id: uuidv4(), text: input, completed: false }]);
        setInput("");
      }
    };

    const toggleTodo = (id: string) => {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const clearCompleted = () => {
      setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo =>
      filter === "all" ? true : filter === "active" ? !todo.completed : todo.completed
    );
  return (
    <div className="todo-app">
      <h1 className="title">todos</h1>
      <input
        type="text"
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTodo()}
        placeholder="What needs to be done?"
      />
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <div className="todo-footer">
        <span>{todos.filter(todo => !todo.completed).length} items left</span>
        <button onClick={() => setFilter("all")} className="filter-btn">All</button>
        <button onClick={() => setFilter("active")} className="filter-btn">Active</button>
        <button onClick={() => setFilter("completed")} className="filter-btn">Completed</button>
        <button onClick={clearCompleted} className="clear-btn">Clear completed</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return <TodoApp />;
};
}
export default App;
