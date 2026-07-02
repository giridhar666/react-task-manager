import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import "./TaskItem.css";
function TaskItem({ task, deleteTask, toggleComplete }) {
  return (
    <div className="task-card">
      <div className="task-left">
        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
        <div className="task-icon">
          <HiOutlineClipboardDocumentList />
        </div>
        <div className="task-info">
          <h3>{task.text}</h3>
          <div className="task-meta">
            <span className={`priority ${(task.priority || "").toLowerCase()}`}>
              {task.priority}
            </span>
            <span className="deadline">
              📅 {task.deadline}
            </span>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <Link to={`/task/${task.id}`} className="view-btn">View</Link>
        <button className="delete-btn" onClick={() => deleteTask(task.id)} >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;