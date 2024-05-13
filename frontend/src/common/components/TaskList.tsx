import React, { useEffect } from "react";
import TaskCard from "../ui/TaskCard";
import { useDispatch } from "react-redux";
import { fetchAllTasksRequest } from "../actions/taskActions";

interface TaskListProps {
    taskList: ITask[];
}
const TaskList:React.FC<TaskListProps> = ({taskList})=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllTasksRequest())
    }, [])

    return(
        <>
            {
                taskList.map(task => (
                    <TaskCard key={task._id} taskData={task} />
                ))
            }
        </>
    )
}

export default TaskList