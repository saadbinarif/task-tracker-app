import React from "react";
import TaskCard from "../ui/TaskCard";

interface TaskListProps {
    taskList: ITask[];
}
const TaskList:React.FC<TaskListProps> = ({taskList})=>{
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