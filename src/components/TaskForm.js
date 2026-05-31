import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;