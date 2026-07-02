import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TaskDetail from "./components/TaskDetail";
function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;
  const today = new Date().toLocaleDateString("en-CA");
  const filteredTasks = tasks.filter((task) => {
    let matchesFilter = true;
    if (filter === "completed") {
      matchesFilter = task.completed;
    }
    else if (filter === "pending") {
      matchesFilter = !task.completed;
    }
    else if (filter === "today") {
      matchesFilter = task.deadline === today;
    }
    else if (filter === "upcoming") {
      matchesFilter = task.deadline > today;
    }
    else if (filter === "high") {
      matchesFilter = task.priority === "High";
    }
    const matchesSearch = (task.text || "").toLowerCase().includes(search.toLowerCase());
    console.log("Task Deadline:", task.deadline);
    console.log("Today:", today);
    return matchesFilter && matchesSearch;
  });
  const addTask = (title, description, deadline, priority) => {
    const newTask = {
      id: Date.now(),
      text: title,
      description,
      deadline,
      priority,
      createdAt: new Date().toLocaleDateString("en-GB"),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };  
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard tasks={tasks} completedTasks={completedTasks} pendingTasks={pendingTasks} addTask={addTask} deleteTask={deleteTask}
            toggleComplete={toggleComplete} filter={filter} setFilter={setFilter} filteredTasks={filteredTasks} search={search} setSearch={setSearch} />
          }
      />
      <Route path="/task/:id" element={<TaskDetail tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} updateTask={updateTask} />} /></Routes>
  );
}
export default App;