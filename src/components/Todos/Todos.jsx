import React, { useState } from "react";
import styles from "./Todos.module.css"; 

const Todos = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    onAdd(newTodo);
    setNewTodo("");
  };

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <input
        className={styles.inputField}
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What's for today?"
      />
      <button className={styles.addButton} onClick={handleAdd}>
        Add
      </button>
    </form>
  );
};

export default Todos;
