import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import "./Todos.css";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  // const email = localStorage.getItem("email") || "";

  const API_URL = "https://todo-backend-sigma-rouge.vercel.app/api/todos";

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: { "x-auth-token": token },
      });
      setTodos(res.data);
    } catch (err) {
      alert("Please login!");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const token = localStorage.getItem("token");
    await axios.post(
      API_URL,
      { text },
      { headers: { "x-auth-token": token } }
    );
    setText("");
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${API_URL}/${id}`,
      { completed: !completed },
      { headers: { "x-auth-token": token } }
    );
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { "x-auth-token": token },
    });
    fetchTodos();
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="todos-page">
      <Header handleSignOut={handleSignOut} />

      <div className="todos-wrapper">
        <h2 className="welcome-text">Your Daily Task Dashboard</h2>

        {/* Stats */}
        <div className="todo-stats-box">
          <div className="stat-item total">Total: {todos.length}</div>
          <div className="stat-item active">
            Active: {todos.filter((t) => !t.completed).length}
          </div>
          <div className="stat-item completed">
            Completed: {todos.filter((t) => t.completed).length}
          </div>
        </div>

        {/* Add Row */}
        <div className="todo-input-row">
          <input
            type="text"
            className="todo-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
          />
          <button className="todo-add-btn" onClick={addTodo}>
            + Add
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list-container">
          {/* Active */}
          <h3 className="section-title">
            Active Tasks ({todos.filter((t) => !t.completed).length})
          </h3>

          {todos.filter((t) => !t.completed).map((todo) => (
            <div className="todo-item" key={todo._id}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Completed */}
          <h3 className="section-title completed-title">
            Completed ({todos.filter((t) => t.completed).length})
          </h3>

          {todos.filter((t) => t.completed).map((todo) => (
            <div className="todo-item completed-task" key={todo._id}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked
                onChange={() => toggleComplete(todo._id, todo.completed)}
              />
              <span className="todo-text completed">{todo.text}</span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos;
