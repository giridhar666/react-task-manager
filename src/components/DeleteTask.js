import React from "react";

function DeleteTask({id}){
    const task =  JSON.parse(localStorage.getItem("tasks")) || []
    const deleteTask = () => {
        const newTasks = task.filter((item) => item.id !== id);
        localStorage.setItem("tasks",JSON.stringify(newTasks));
        window.location.reload();
    }

    return(
        <button type="button" onClick={deleteTask}>Delete Task</button>
    )
}
export default DeleteTask