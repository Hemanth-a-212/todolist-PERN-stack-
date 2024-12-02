import React, { Fragment, useState } from "react";
import './Edit.css';
const Edit = ({ todo }) => {
  const [task, setTask] = useState(todo.task);
  console.log(todo);
  
  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { task };
      await fetch(
        `http://localhost:5000/todo/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn"
        style={{ backgroundColor: '#536493', color: 'white' }}
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${todo.id}`}
        onClick={() => setTask(todo.task)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setTask(todo.task)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={task}
                onChange={e => setTask(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn"
                style={{ backgroundColor: '#536493', color: 'white' }}
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn"
                style={{ backgroundColor: '#EF5A6F', color: 'white' }}
                data-dismiss="modal"
                onClick={() => setTask(todo.task)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;
