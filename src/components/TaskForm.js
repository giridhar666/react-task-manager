import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Select");

  const handleSubmit = (e) => {
      e.preventDefault();

      const errors = [];

      if (!title.trim()) errors.push("Task Title");
      if (!description.trim()) errors.push("Task Description");
      if (!deadline) errors.push("Deadline");
      if (priority === "Select") errors.push("Priority");
      if (errors.length > 0) {
        alert(`Please fill:\n\n${errors.join("\n")}`);
        return;
      }

      addTask(title, description, deadline, priority);

      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("Select");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input className="task-name"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea  className="task-description"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input  className="task-date"
        type="date"
        value={deadline}
        onChange={(e)=>setDeadline(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-style">
        <option value="Select">-- Select Priority --</option>
        <option value="Low">🟢 Low</option>
        <option value="Medium">🟡 Medium</option>
        <option value="High">🔴 High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;