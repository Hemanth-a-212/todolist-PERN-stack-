import React, { Fragment, useEffect, useState } from "react";
import './Tasklist.css';
import Edit from "../Edit/Edit";

const Tasklist = () => {
  const [todo, setTodo] = useState([]);

  const deleteTodo = async id => {
    try {
      await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE"
      });

      setTodo(todo.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo");
      const jsonData = await response.json();

      setTodo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todo);

  return (
    <Fragment>
      <div className="task-list">
          {todo.map(todo => (
            <div className="task-cont">
                <p className="task">{todo.task}</p>
                <Edit todo={todo} />
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                </div>
          ))}
          </div>
    </Fragment>
  );
};

export default Tasklist;
