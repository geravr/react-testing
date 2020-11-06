import React, { useState } from "react";
import style from './todoForm.module.css';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <form className={style.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Read a book"
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
