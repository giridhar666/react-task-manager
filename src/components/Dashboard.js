import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import './Dashboard.css';
import profileImage from "./assets/profile.jpg";
function Dashboard({ tasks, completedTasks, pendingTasks, addTask, deleteTask, toggleComplete, filter, setFilter, filteredTasks, search, setSearch,}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <h2>📋 Task Manager</h2>
        </div>
        <nav className="sidebar-menu">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
              🏠 All Tasks 
          </button>
          <button className={filter==="today" ? "active" : ""} onClick={()=>setFilter("today")}>
              📅 Today
          </button>
          <button className={filter==="upcoming" ? "active" : ""} onClick={()=>setFilter("upcoming")}>
              🕒 Upcoming
          </button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
              ⏳ Pending
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
              ✅ Completed
          </button>
          {/*
          <button>📂 Categories</button>
          <button>⚙ Settings</button> */}
        </nav>
        <div className="quick-stats">
          <h3>Quick Stats</h3>
          <div className="stat-box">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="stat-box">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
          <div className="stat-box">
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>
      </aside>
      <main className="dashboard-content">
        <div className="topbar">
          <input type="text" placeholder="🔍 Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="profile">🔔 <img src={profileImage} alt="profile" className="profile-img"/></div>
        </div>
        <div className="page-header">
          <div>
            <h1>All Tasks</h1>
            <p>Manage and organize all your tasks</p>
          </div>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "✕ Cancel" : "+ Add Task"}
          </button>
        </div>
        {showForm && (
          <TaskForm addTask={addTask} />
        )}
        <div className="filters">
          <button className={filter === "all" ? "active" : ""}  onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
            Pending
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>
        <TaskList tasks={filteredTasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
      </main>
    </div>
  );
}
export default Dashboard;