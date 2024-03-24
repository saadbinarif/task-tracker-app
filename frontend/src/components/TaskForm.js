import { useState } from 'react'
import { useTaskContext } from '../hook/useTaskContext'

export default function TaskForm(){
const {dispatch} = useTaskContext();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const task = {title, description, status} ;

    const response = await fetch("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers:{
            'Content-Type': 'application/json'
        } 
    })

    const json = await response.json();
    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
        console.log(error)
    }
    if (response.ok) {
        setError(null)
        setTitle('')
        setDescription('')
        setStatus('')
        setEmptyFields([])
        console.log('new workout added:', json)
        dispatch({type: "CREATE_TASK", payload: json})
      }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Task</h3>

      <label>Task Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes("title")? "error" : ""}
      />

      <label>Description</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes("description")? "error" : ""}
      />

      <label>Status</label>
      <input 
        type="text" 
        onChange={(e) => setStatus(e.target.value)} 
        value={status} 
        className={emptyFields.includes("status")? "error" : ""}
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

