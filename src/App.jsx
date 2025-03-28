import React, { useEffect, useState } from "react";
import { Todos, Todo, Header } from "./index";
import styles from "./App.module.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAdding = (newTodo) => {
    if (!newTodo.trim()) return;

    const todoItem = {
      title: newTodo.trim(),
      completed: false,
      id: Date.now(),
    };

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoItem),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prev) => [data, ...prev]);
      });
  };

  const handleEditing = (id, updatedTitle) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updatedTitle }),
    })
      .then((res) => res.json())
      .then(() => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, title: updatedTitle } : todo
          )
        );
      });
  };

  const handleDeleting = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    });
  };

  const handleCheckboxChange = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTodos = showCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  const handleToggleComplete = (id, currentStatus) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentStatus }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id
              ? { ...todo, completed: updatedTodo.completed }
              : todo
          )
        );
      });
  };
  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.todosContainer}>
        <Todos onAdd={handleAdding} />
        <div>
          <label for="completedTasks">Show Completed Tasks Only</label>
          <input
            className={styles.checkbox}
            id="completedTasks"
            type="checkbox"
            checked={showCompleted}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onEdit={handleEditing}
              onDelete={handleDeleting}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
