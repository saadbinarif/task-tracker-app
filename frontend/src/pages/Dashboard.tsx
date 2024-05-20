import React, { useEffect, useRef, useState } from "react";
import Header from "../common/components/Header";
// import TaskCard from "../common/ui/TaskCard";
import TaskList from "../common/components/TaskList"
import tasks from "../tasks";
import CreateTask from "../common/components/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasksRequest } from "../common/actions/taskActions";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ScrollBox from "../common/ui/ScrollBox";
import ScrollBoxSection from "../common/components/ScrollBoxSection";






const Dashboard: React.FC = () => {

    const backendtasks = useSelector((state: any) => state.tasks.tasks)
    const pendingTasks = backendtasks.filter((t: any) => t.status == "in progress")
    const completedTasks = backendtasks.filter((t: any) => t.status == "completed")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTasksRequest())

    }, [])





    const statsBoxStyles = "bg-primary rounded-sm p-6 text-white text-center min-w-60"
    const statsBoxNumber = "text-6xl mb-4"


    return (
        <div>
            <Header title="Dashboard" />

            <div className="grid grid-cols-3 justify-items-center p-20 ">
                <div className={statsBoxStyles}>
                    <h1 className={statsBoxNumber}>{backendtasks.length}</h1>
                    <p>Total</p>
                </div>
                <div className={statsBoxStyles}>
                    <h2 className={statsBoxNumber}>{completedTasks.length}</h2>
                    <p>Completed</p>
                </div>
                <div className={statsBoxStyles}>
                    <h2 className={statsBoxNumber}>{pendingTasks.length}</h2>
                    <p>Pending</p>
                </div>

            </div>

            <ScrollBoxSection />

            {/* <div className="p-10">
                <div className="w-3/5">
                    <TaskList taskList={backendtasks} />
                </div>
                <div className="p-2 border-t border-black-500">
                    <CreateTask />
                </div>
            </div> */}

        </div>
    )
}

export default Dashboard