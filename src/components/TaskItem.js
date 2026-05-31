import React from "react";

function TaskItem({ task, deleteTask, toggleComplete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => toggleComplete(task.id)}>
        {task.text}
      </span>

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;