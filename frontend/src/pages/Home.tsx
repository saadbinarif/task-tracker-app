// import {  useEffect, useState } from "react"
// import TaskDetails from "../components/TaskDetails"
// import TaskForm from "../components/TaskForm"
// import { useTaskContext } from "../hook/useTaskContext"
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

// export default function Home(){
//     const [val,setval] = useState('')

//     const handledate = (e)=>{
//         setval(e.target.value)
//         console.log(val)
//     }
    
//     const {tasks, dispatch} = useTaskContext()

//     useEffect(()=>{
//         const fetchTasks = async()=>{
//             const response = await fetch('/tasks')
//             const json = await response.json()

//             if(response.ok){
//                 dispatch({type:"SET_TASKS", payload: json})
//                 console.log(tasks)
//             }
//         }
//         fetchTasks();

//         socket.on('task_expires', (notification) => {
//             alert(notification.message);
//           });
//     }, [])
//     return (
//       <div className="home">

//         <div className="tasks">
//             {
//                 tasks && tasks.map(task =>{
//                     return <TaskDetails key={task._id} task={task} />
//                 })
//             }
//         </div>
           
//             <input type="datetime-local" onChange={handledate } value={val}></input>
            
//       </div>
//     )
//   }
  
