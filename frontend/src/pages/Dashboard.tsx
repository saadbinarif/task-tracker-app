import React from "react";
import Header from "../common/components/Header";
// import TaskCard from "../common/ui/TaskCard";
import TaskList from "../common/components/TaskList"
import tasks from "../tasks";





const Dashboard: React.FC = ()=>{
    const statsBoxStyles = "bg-primary rounded-sm p-6 text-white text-center min-w-60"
    const statsBoxNumber = "text-6xl mb-4"
    return(
        <>
        <Header title="Dashboard"/>

    <div className="grid grid-cols-3 justify-items-center p-20">
        <div className={statsBoxStyles}>
            <h1 className={statsBoxNumber}>0</h1>
            <p>Total</p>
        </div>
        <div className={statsBoxStyles}>
            <h2 className={statsBoxNumber}>0</h2>
            <p>Completed</p>
        </div>
        <div className={statsBoxStyles}>
            <h2 className={statsBoxNumber}>0</h2>
            <p>Pending</p>
        </div>
        
    </div>        
       <div className="p-10">
        <TaskList taskList={tasks}/>
       </div>
        

        
        </>
    )
}

export default Dashboard