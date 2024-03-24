import {  useEffect } from "react"
import TaskDetails from "../components/TaskDetails"
import TaskForm from "../components/TaskForm"
import { useTaskContext } from "../hook/useTaskContext"

export default function Home(){
    
    const {tasks, dispatch} = useTaskContext()

    useEffect(()=>{
        const fetchTasks = async()=>{
            const response = await fetch('/tasks')
            const json = await response.json()

            if(response.ok){
                dispatch({type:"SET_TASKS", payload: json})
                console.log(tasks)
            }
        }
        fetchTasks();
    }, [])
    return (
      <div className="home">
        <div className="tasks">
            {
                tasks && tasks.map(task =>{
                    return <TaskDetails key={task._id} task={task} />
                })
            }
        </div>
            <TaskForm />
      </div>
    )
  }
  
