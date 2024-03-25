import { useTaskContext } from "../hook/useTaskContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
const { format } = require('date-fns');


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

    
    console.log('my date', task.dueDate)

    return (
        
        <div className="task-details">
            <h4>{task.title}</h4>
            <p className="description"><strong>Description: </strong> {task.description} </p>
            <span className="delete-btn" onClick={deleteHandler}>Delete</span>
            <div className="task-details-bottom">
            <p style={{textAlign: "left"}}><strong>Status: </strong>{task.status}</p>
            <span >{task.dueDate ? <span>{format(task.dueDate, 'yyyy-mm-dd')}</span> : <strong>Date not set</strong>}</span>
            
  
            </div>
        </div>
        
        // formatDistanceToNow(new Date(task.dueDate), {addSuffix: true})
    );
}