import React, { Fragment, useState } from "react";
import './Taskform.css';
const Taskform = () => {
  const [task, setTask] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { task };
      await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form className="form" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="input"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button className="input-btn">Add</button>
      </form>
    </Fragment>
  );
};

export default Taskform;
