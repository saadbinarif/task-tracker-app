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
            <p><strong>Status </strong>{task.status}</p>
            <p><strong>Description: </strong> {task.description} </p>
            <span onClick={deleteHandler}>Delete</span>
        </div>
    );
}