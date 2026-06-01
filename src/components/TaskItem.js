import React from "react";

function TaskItem({ task, deleteTask, toggleComplete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />

        <span style={{ marginLeft: "10px" }}>
          {task.text}
        </span>
      </div>

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;