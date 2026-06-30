import { useState } from "react";
import {useParams, Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import "./TaskDetails.css";

function TaskDetail({tasks, deleteTask, toggleComplete, updateTask}){
    const { id } = useParams();
    const task = tasks.find((item) => item.id === Number(id));
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.text);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [deadline, setDeadline] = useState(task.deadline);

        if (!task) {
            return (
            <div className="task-details">
                <h2>Task Not Found</h2>
                <Link to="/">← Back</Link>
            </div>
            );
        }    
    const deletetask = () => {
        const newTasks = tasks.filter((item) => item.id !== Number(id));
        localStorage.setItem("tasks",JSON.stringify(newTasks));
        navigate("/");
        window.location.reload();
    }
    return (
        <div className="task-details-page">
            <div className="task-header">
                <button className="back-btn" onClick={() => navigate("/")}> ← Back</button>
                <div className="header-actions">
                    <button className="edit-btn" onClick={() => {
                            if(isEditing){updateTask({...task, text:title, description, priority, deadline});
                                setIsEditing(false);
                            }else{
                                setIsEditing(true);
                            }
                            }}
                        >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                    <button className="delete-btn" onClick={() => {deleteTask(task.id); navigate("/");}}>
                        <MdDeleteOutline />
                    </button>
                </div>
            </div>
        <div className="task-details-card">
            <div className="task-title-row">
                <div className="task-icon">
                    📋
                </div>
                <div className="tast-ttl-sec">
                    { isEditing ? <input  class="task-name" value={title} onChange={(e)=>setTitle(e.target.value)} /> : <h1>{task.text}</h1> }
                    <p className="task-category">Task</p>
                </div>
            </div>
            <div className="task-description">
                <h3>Description</h3>
                { isEditing ? <textarea value={description} onChange={(e)=>setDescription(e.target.value)} /> : <p>{task.description}</p> }
            </div>
            <div className="task-info-grid">
                <div className="info-card">
                    <h5>Priority</h5>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                        { isEditing ? <select value={priority} onChange={(e)=>setPriority(e.target.value)}> 
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select> : <p>{task.priority}</p> }
                    </span>
                </div>
                <div className="info-card">
                    <h5>Status</h5>
                    <p>{task.completed ? "Completed" : "Pending"}</p>
                </div>
                <div className="info-card">
                    <h5>Deadline</h5>
                    { isEditing ? <input type="date" className="deadline" value={deadline} onChange={(e)=>setDeadline(e.target.value)} /> : <p>{task.deadline}</p>}
                </div>
                <div className="info-card">
                    <h5>Created</h5>
                    <p>{task.createdAt}</p>
                </div>
            </div>
            <div className="task-actions">
                <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
                    {task.completed ? "Completed" : "Mark Complete"}
                </button>
            </div>
        </div>
    </div>
    );
}
export default TaskDetail;