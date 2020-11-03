import React from 'react';
import style from './todo.module.css'

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      className={style.todo}
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div className={style.actions}>
        <button className={`${style.btn} ${style.primary}`} onClick={() => completeTodo(index)}>✔ Complete</button>
        <button className={`${style.btn} ${style.danger}`} onClick={() => removeTodo(index)}>X Delete</button>
      </div>
    </div>
  );
}

export default Todo;