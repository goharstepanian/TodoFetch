import React, { useState } from "react";
import styles from "./Todo.module.css";

const Todo = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className={styles.todoContainer}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.completed)}
        className={styles.checkbox}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.editInput}
        />
      ) : (
        <p className={todo.completed ? styles.completed : styles.todoText}>
          {todo.title}
        </p>
      )}

      <div className={styles.buttonGroup}>
        {isEditing ? (
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className={styles.button} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className={styles.button} onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
