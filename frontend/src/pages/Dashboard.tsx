import React, { useEffect } from "react";
import Header from "../common/components/Header";
// import TaskCard from "../common/ui/TaskCard";
import TaskList from "../common/components/TaskList"
import tasks from "../tasks";
import CreateTask from "../common/components/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasksRequest } from "../common/actions/taskActions";




const Dashboard: React.FC = ()=>{

    const backendtasks = useSelector((state:any)=>state.tasks.tasks)
    const pendingTasks = backendtasks.filter((t:any)=>t.status=="in progress")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllTasksRequest())
    }, [])

    const statsBoxStyles = "bg-primary rounded-sm p-6 text-white text-center min-w-60"
    const statsBoxNumber = "text-6xl mb-4"
    return(
        <>
        <Header title="Dashboard"/>

    <div className="grid grid-cols-3 justify-items-center p-20 ">
        <div className={statsBoxStyles}>
            <h1 className={statsBoxNumber}>{backendtasks.length}</h1>
            <p>Total</p>
        </div>
        <div className={statsBoxStyles}>
            <h2 className={statsBoxNumber}>0</h2>
            <p>Completed</p>
        </div>
        <div className={statsBoxStyles}>
            <h2 className={statsBoxNumber}>{pendingTasks.length}</h2>
            <p>Pending</p>
        </div>
        
    </div>  

     <div className="grid grid-cols-3 px-6  bg-red-200 gap-3">
        {/* overdue grid */}
        <div className="  ">
        <div className="ps-4 pb-1 text-sm font strong">Overdue</div>
        <div className="bg-blue-100 p-2 overflow-hidden h-2/3 ">
        <TaskList taskList={tasks}/>
       </div>
       
        <CreateTask />
        

        </div>

        {/* today grid */}
        <div className=" bg-blue-100 p-2 ">
        <div className="ps-4 pb-1 text-sm font strong">Today</div>
        <div className="">
        <TaskList taskList={tasks}/>
       </div>
       <CreateTask />
        </div>

        {/* tommorow Grid */}
        <div className=" bg-blue-100 p-2 ">
        <div className="ps-4 pb-1 text-sm font strong">Tomorrow</div>
        <div className="">
        <TaskList taskList={tasks}/>
       </div>
       <CreateTask />
        </div>

    </div>

       <div className="p-10">
        <div className="w-3/5">
        <TaskList taskList={backendtasks}/>
        </div>
        <div className="p-2 border-t border-black-500">
        <CreateTask />
        </div>
       </div>
       

        
        </>
    )
}

export default Dashboard