import React, { useState } from "react";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Add New Task
  const addTask = (taskText) => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task Manager</h1>

        <TaskForm addTask={addTask} />

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;