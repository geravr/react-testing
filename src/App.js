import React, { useState } from "react";
import style from "./app.module.css";

// Components
import TodoForm from "./components/TodoForm/TodoForm";
import Todo from "./components/Todo/Todo"; 

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Todo 1",
      isCompleted: false
    },
    {
      text: "Todo 2",
      isCompleted: false
    },
    {
      text: "Todo 3",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  
  return (
    <div className={style.app}>
      <div className={style.todoList}>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
