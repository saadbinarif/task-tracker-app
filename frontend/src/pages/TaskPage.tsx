import React, { useEffect, useState } from "react";
import Header from "../common/components/Header";
import TaskList from "../common/components/TaskList";
import CreateTask from "../common/components/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasksRequest } from "../common/actions/taskActions";

const TaskPage: React.FC = () => {

    const tasks = useSelector((state: any) => state.tasks.tasks)

   
    

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchAllTasksRequest())
        
    // }, [])

    return (
        <>

            <Header title="Tasks" />
            <div className="container  p-10">
                {/* <div className="p-10"> */}
                    {/* <div className="p-2 border-y mb-2 border-black-500">
                        <CreateTask />
                    </div> */}
                    <div className="w-3/5">
                    <span className="p-2 border-y mb-2 border-black-500">
                        <CreateTask />
                    </span>
                        <TaskList taskList={tasks} />
                    </div>

                {/* </div> */}
            </div>

        </>
    );
}

export default TaskPage