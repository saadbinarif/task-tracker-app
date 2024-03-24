import { useTaskContext } from "../hook/useTaskContext";


export default function Navbar({task}){
    const {dispatch} = useTaskContext();

    const deleteHandler = async()=>{
        const response = await fetch('/tasks/' + task._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: "DELETE_TASK", payload: json})
        }

    }

    return (
        
        <div className="task-details">
            <h4>{task.title}</h4>
            <p className="description"><strong>Description: </strong> {task.description} </p>
            <span className="delete-btn" onClick={deleteHandler}>Delete</span>
            <div className="task-details-bottom">
            <p style={{textAlign: "left"}}><strong>Status: </strong>{task.status}</p>
            <span >2 days left</span>
            </div>
        </div>
        
        
    );
}