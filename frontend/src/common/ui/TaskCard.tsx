
import React, {useEffect, useState} from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagCard from "./TagCard";
import DisplayTask from "../components/DisplayTask";
import { useDispatch } from "react-redux";
import { fetchAllTasksRequest } from "../actions/taskActions";



interface TaskCardProps {
    taskData: ITask

}

const TaskCard:React.FC<TaskCardProps> = ({taskData})=>{
    
const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log('onHandleOpen', open)
    }
    const handleClose = () => {
        setOpen(false);
        console.log('onHandleClose', open)
    }

    useEffect(()=>{
        dispatch(fetchAllTasksRequest())
      },[open])
    

        
    return (
        <>
        <div className="bg-white shadow-lg min-w-60 p-4 rounded-xl mb-4" onClick={handleOpen} key={taskData._id}>
            <p className="font-semibold text-xl">{taskData.title}</p>
            
            <p className="font-light text-sm truncate-3-lines">{taskData.description}</p>
            <div className="flex gap-2 p-1">
                {
                    taskData.tags.map(tag => (
                        <TagCard 
                        key={tag._id} 
                        tag={tag}
                        />
                    ))
                }
            </div>
            <div className="p-2">
            <hr />
            </div>
            <div className="text-[#999999] text-xs">
                <p className="mb-1">Status: <span className="text-black">{taskData.status}</span></p>
                <p className="mb-1">Due date: <span className="text-black"><CalendarTodayIcon sx={{fontSize:"14px"}}/> {taskData.dueDate}</span></p>
                <p>Progress: <span  className="text-black">{taskData.progress}%</span></p>
            </div>
            
        </div>
       
        <DisplayTask isOpen={open} onClose={handleClose} taskData={taskData}/>
        </>

        
    )

}

export default TaskCard